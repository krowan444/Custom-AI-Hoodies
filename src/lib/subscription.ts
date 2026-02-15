import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from './supabase-admin';

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    const { data: subscription } = await supabaseAdmin
        .from('subscriptions')
        .select('*, prices(*)')
        .eq('user_id', userId)
        .single();

    if (!subscription) {
        return false;
    }

    const isValid =
        subscription.status === 'active' &&
        new Date(subscription.current_period_end).getTime() + DAY_IN_MS > Date.now();

    return !!isValid;
};
