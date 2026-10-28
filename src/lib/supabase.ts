"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public by design (protected by row level security); env vars allow pointing at another project.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://tncfwqukhuejssrldjbr.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_9pxctFIFJMiXegedBEYs2g_lrfiyBWY";

/** Google sign-in stays hidden until the provider is configured in the Supabase dashboard. */
export const GOOGLE_AUTH_ENABLED = true;

let client: SupabaseClient | null = null;

/** Browser-only singleton. The session lives in localStorage; PKCE codes in the URL are exchanged automatically. */
export function supabase() {
  client ??= createClient(URL, KEY, {
    auth: { flowType: "pkce", persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  return client;
}
