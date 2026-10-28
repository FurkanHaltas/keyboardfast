import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Same project as the browser client (src/lib/supabase.ts is a client module, so it can't be imported here).
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://tncfwqukhuejssrldjbr.supabase.co";

let admin: SupabaseClient | null = null;

/** Server-only client with the secret key: bypasses RLS, used to write verified results. */
export function supabaseAdmin() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) return null;
  admin ??= createClient(URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return admin;
}
