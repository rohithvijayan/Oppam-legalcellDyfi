import { createClient } from "@supabase/supabase-js";

/**
 * Admin client — uses service role key.
 * DO NOT use this in client-side code (it will be stripped by Next.js if the key is not prefixed with NEXT_PUBLIC).
 */
export function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is missing for Admin Client");
    }

    return createClient(url, serviceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        },
    });
}
