import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url && typeof window !== "undefined") {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is missing");
  }
  return url || "https://placeholder.supabase.co";
}

function getSupabaseAnonKey() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key && typeof window !== "undefined") {
    console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");
  }
  return key || "placeholder-key";
}

// Client-side / default client
export const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey());

// Admin client — uses service role key, only for server-side code
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is missing for Admin Client");
  }
  
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
