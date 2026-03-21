import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

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

// Client-side / default client with cookie persistence
export const supabase = typeof window !== "undefined"
  ? createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey())
  : createClient(getSupabaseUrl(), getSupabaseAnonKey());
