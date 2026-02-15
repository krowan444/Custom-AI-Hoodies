export const dynamic = "force-dynamic";

import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const formData = await req.formData();
        const priceKey = formData.get("priceKey") as string;

        // Safety check to ensure we only use allowed env keys
        // This prevents users from injecting arbitrary price IDs
        const allowedKeys = [
            "STRIPE_PRICE_ENTHUSIAST",
            "STRIPE_PRICE_CREATOR",
            "STRIPE_PRICE_MOGUL"
        ];

        if (!allowedKeys.includes(priceKey)) {
            return new NextResponse("Invalid Price Key", { status: 400 });
        }

        const priceId = process.env[priceKey];

        if (!priceId) {
            return new NextResponse("Price Configuration Missing in Env", { status: 500 });
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/create?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership`,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
            client_reference_id: userId,
        });

        return redirect(stripeSession.url!);

    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
