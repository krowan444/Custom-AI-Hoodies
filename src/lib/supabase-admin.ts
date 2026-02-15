import { createClient } from '@supabase/supabase-js';

// Note: This client uses the SERVICE_ROLE_KEY and should only be used server-side.
// It bypasses Row Level Security (RLS).
export const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
