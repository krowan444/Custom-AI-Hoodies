import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { checkSubscription } from "@/lib/subscription";

// Plan Limits (Could be env vars, but hardcoded for MVP as per spec)
const LIMITS: Record<string, number> = {
    STRIPE_PRICE_ENTHUSIAST: 10,
    STRIPE_PRICE_CREATOR: 50,
    STRIPE_PRICE_MOGUL: 999999, // Unlimited
};

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { prompt, color, size } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // 1. Verify Active Subscription
        const { data: subscription } = await supabaseAdmin
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .single();

        if (!subscription) {
            return new NextResponse("Subscription Required", { status: 403 });
        }

        // 2. Check Usage Limits
        // Determine limit based on price_id
        // In real app, we might store price_id -> limit mapping in DB or config
        // For now, we need to map the price_id from DB back to our Env Var keys or just check values
        // We'll simplisticly assume we can look up by VALUE

        let limit = 0;
        // Reverse lookup or just check
        if (subscription.price_id === process.env.STRIPE_PRICE_ENTHUSIAST) limit = LIMITS.STRIPE_PRICE_ENTHUSIAST;
        else if (subscription.price_id === process.env.STRIPE_PRICE_CREATOR) limit = LIMITS.STRIPE_PRICE_CREATOR;
        else if (subscription.price_id === process.env.STRIPE_PRICE_MOGUL) limit = LIMITS.STRIPE_PRICE_MOGUL;
        else limit = 5; // Fallback or free tier? Spec says redirect to membership if no sub.

        const periodStart = subscription.current_period_start;
        const periodEnd = subscription.current_period_end;

        // Check usage
        const { data: usage } = await supabaseAdmin
            .from('usage')
            .select('count')
            .eq('user_id', userId)
            .gte('period_start', periodStart)
            .lte('period_end', periodEnd)
            .single();

        const currentCount = usage?.count || 0;

        if (currentCount >= limit) {
            return new NextResponse(`Limit Reached. You have used ${currentCount} of ${limit} generations.`, { status: 429 });
        }

        // 3. Increment Usage (Atomic Upsert)
        // We need to upsert. If row exists, increment. If not, create with count 1.
        // Supabase upsert with conflict on user_id, period_start, period_end

        // Attempt to upsert
        // Note: Concurrency might need RPC, but for MVP upsert is okay-ish if low volume.
        // Better: RPC call 'increment_usage'

        const { error: usageError } = await supabaseAdmin
            .from('usage')
            .upsert({
                user_id: userId,
                period_start: periodStart,
                period_end: periodEnd,
                count: currentCount + 1, // This is not strictly atomic but okay for MVP
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,period_start,period_end' });

        if (usageError) {
            console.error("Usage Update Error", usageError);
            return new NextResponse("System Error", { status: 500 });
        }

        // 4. "Generate" Image (Stub)
        // In future: Call Gemini/DALL-E
        const imageUrl = "/placeholder-hoodie-design.png"; // Client should handle this path or we provide absolute?
        // Let's return a unsplash text image for better vibe
        const vibeyUrl = `https://placehold.co/600x600/101010/FFF?text=${encodeURIComponent(prompt.slice(0, 20))}`;

        // 5. Save Design to DB
        const { data: design, error: designError } = await supabaseAdmin
            .from('designs')
            .insert({
                user_id: userId,
                prompt,
                hoodie_color: color,
                hoodie_size: size,
                image_url: vibeyUrl
            })
            .select()
            .single();

        if (designError) {
            console.error("Design Save Error", designError);
            return new NextResponse("Database Error", { status: 500 });
        }

        return NextResponse.json({
            design,
            remaining: limit - (currentCount + 1),
            limit
        });

    } catch (error) {
        console.log("[GENERATE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
