import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
    if (!_stripe) {
        _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2026-01-28.clover',
            appInfo: {
                name: 'Custom AI Hoodies',
                version: '0.1.0',
            },
        });
    }
    return _stripe;
}

// Keep backward compat export (lazy getter)
export const stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
        return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
    },
});
