export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    // Await headers() for Next.js 15 compatibility
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json(
            { error: `Webhook Error: ${message}` },
            { status: 400 }
        );
    }

    const session = event.data.object as Stripe.Checkout.Session;

    // Handle successful subscription checkout
    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );
        const subData = subscription as unknown as Record<string, unknown>;

        if (!session.metadata?.userId) {
            return NextResponse.json(
                { error: "No userId in metadata" },
                { status: 400 }
            );
        }

        await supabaseAdmin.from("subscriptions").upsert({
            user_id: session.metadata.userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscription.id,
            stripe_price_id: subscription.items.data[0].price.id,
            status: subscription.status,
            current_period_start: new Date(
                (subData.current_period_start as number) * 1000
            ).toISOString(),
            current_period_end: new Date(
                (subData.current_period_end as number) * 1000
            ).toISOString(),
        });
    }

    // Handle subscription updates (upgrades/downgrades)
    if (event.type === "customer.subscription.updated") {
        const subscription = event.data.object as Stripe.Subscription;
        const subData2 = subscription as unknown as Record<string, unknown>;

        await supabaseAdmin
            .from("subscriptions")
            .update({
                stripe_price_id: subscription.items.data[0].price.id,
                status: subscription.status,
                current_period_start: new Date(
                    (subData2.current_period_start as number) * 1000
                ).toISOString(),
                current_period_end: new Date(
                    (subData2.current_period_end as number) * 1000
                ).toISOString(),
            })
            .eq("stripe_subscription_id", subscription.id);
    }

    // Handle subscription cancellation
    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;

        await supabaseAdmin
            .from("subscriptions")
            .update({ status: "canceled" })
            .eq("stripe_subscription_id", subscription.id);
    }

    return NextResponse.json({ received: true });
}
