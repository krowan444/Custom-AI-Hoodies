export const dynamic = "force-dynamic";

import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { checkSubscription } from "@/lib/subscription";

// Pricing Config (in GBP)
const BASE_PRICE = 39.99;
const SHIPPING_OPTIONS = {
    "uk-standard": { price: 3.99, label: "UK Standard Shipping" },
    "uk-tracked": { price: 4.99, label: "UK Tracked Shipping" },
    "intl-standard": { price: 9.99, label: "International Standard" },
    "intl-tracked": { price: 14.99, label: "International Tracked" },
};

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();
        const body = await req.json();
        const { designId, color, size } = body;
        // Defaulting shipping for now, in real app UI would pass this
        const shippingOptionId = "uk-standard";

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // 1. Get Design
        const { data: design } = await supabaseAdmin
            .from('designs')
            .select('*')
            .eq('id', designId)
            .eq('user_id', userId)
            .single();

        if (!design) {
            return new NextResponse("Design not found", { status: 404 });
        }

        // 2. Determine Discount
        const { data: subscription } = await supabaseAdmin
            .from('subscriptions')
            .select('price_id')
            .eq('user_id', userId)
            .eq('status', 'active')
            .single();

        let discountPercent = 0;
        if (subscription?.price_id === process.env.STRIPE_PRICE_ENTHUSIAST) discountPercent = 0.05;
        if (subscription?.price_id === process.env.STRIPE_PRICE_CREATOR) discountPercent = 0.15;
        if (subscription?.price_id === process.env.STRIPE_PRICE_MOGUL) discountPercent = 0.25;

        // 3. Calculate Totals (Server Side!)
        const discountAmount = Math.round((BASE_PRICE * discountPercent) * 100) / 100;
        const discountedBasePrice = BASE_PRICE - discountAmount;
        const shippingPrice = SHIPPING_OPTIONS[shippingOptionId as keyof typeof SHIPPING_OPTIONS].price;
        const total = discountedBasePrice + shippingPrice;

        // 4. Create Stripe Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: user.emailAddresses[0].emailAddress,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/create`,
            client_reference_id: userId,
            metadata: {
                userId,
                designId,
                hoodie_color: color,
                hoodie_size: size,
                shipping_option_id: shippingOptionId
            },
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: `Custom AI Hoodie (${color}, ${size})`,
                            description: `Design ID: ${designId}`,
                            images: [design.image_url] // Hope this is a valid URL
                        },
                        unit_amount: Math.round(discountedBasePrice * 100), // Stripe expects pence
                    },
                    quantity: 1,
                },
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: SHIPPING_OPTIONS[shippingOptionId as keyof typeof SHIPPING_OPTIONS].label,
                        },
                        unit_amount: Math.round(shippingPrice * 100),
                    },
                    quantity: 1,
                }
            ],
        });

        // 5. Create Order Record (Draft)
        await supabaseAdmin.from('orders').insert({
            user_id: userId,
            design_id: designId,
            hoodie_color: color,
            hoodie_size: size,
            shipping_option_id: shippingOptionId,
            base_price_gbp: BASE_PRICE,
            discount_percent: discountPercent,
            discount_amount_gbp: discountAmount,
            shipping_gbp: shippingPrice,
            total_gbp: total,
            stripe_checkout_session_id: session.id,
            status: 'submitted' // Close enough for now
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.log("[ORDER_CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
