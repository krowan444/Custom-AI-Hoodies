export const dynamic = "force-dynamic";

import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        // If this is a subscription checkout
        if (session.mode === 'subscription') {
            const subscriptionId = session.subscription as string;
            const customerId = session.customer as string;
            const userId = session.client_reference_id || session.metadata?.userId;

            if (!userId) {
                return new Response('Missing user_id in webhook', { status: 400 });
            }

            await supabaseAdmin.from('subscriptions').upsert({
                user_id: userId,
                stripe_customer_id: customerId,
                stripe_subscription_id: subscriptionId,
                status: 'active', // Will be updated by subscription.created/updated events shortly
                price_id: '', // Will be updated
            });
        }
    }

    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as Stripe.Subscription;
        const subData = subscription as unknown as Record<string, unknown>;

        const { data: userData } = await supabaseAdmin
            .from('subscriptions')
            .select('user_id')
            .eq('stripe_customer_id', subscription.customer as string)
            .single();

        if (userData?.user_id) {
            await supabaseAdmin.from('subscriptions').upsert({
                user_id: userData.user_id,
                stripe_customer_id: subscription.customer as string,
                stripe_subscription_id: subscription.id,
                status: subscription.status,
                price_id: subscription.items.data[0].price.id,
                current_period_start: new Date((subData.current_period_start as number) * 1000).toISOString(),
                current_period_end: new Date((subData.current_period_end as number) * 1000).toISOString(),
                cancel_at_period_end: subscription.cancel_at_period_end,
            });
        }
    }

    return new Response(null, { status: 200 });
}
