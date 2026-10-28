import { NextResponse, type NextRequest } from "next/server";
import { summarizeKeys } from "@/engine/stats";
import type { TestConfig } from "@/lib/createTest";
import { supabaseAdmin } from "@/server/supabaseAdmin";
import { readTicket, TICKET_TTL_MS } from "@/server/ticket";
import { verifyTest } from "@/server/verify";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_BODY = 512 * 1024;

interface Body {
  id: string;
  ticket: string;
  config: TestConfig;
  events: unknown;
}

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

/**
 * Verifies a finished test and stores it as a verified result (the only kind the
 * leaderboard ranks). The client saves its own unverified copy regardless; this upsert
 * then replaces it with the server-computed numbers.
 */
export async function POST(req: NextRequest) {
  const admin = supabaseAdmin();
  if (!admin) return fail("disabled", 503);

  const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return fail("unauthorized", 401);
  const { data: auth } = await admin.auth.getUser(token);
  if (!auth.user) return fail("unauthorized", 401);

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) return fail("too_large", 413);
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail("invalid_json");
  }
  if (typeof body?.id !== "string" || !UUID.test(body.id) || typeof body.ticket !== "string" || !body.config) {
    return fail("invalid_request");
  }

  const ticket = readTicket(body.ticket);
  if (!ticket) return fail("invalid_ticket");
  const age = Date.now() - ticket.iat;
  if (age < 0 || age > TICKET_TTL_MS) return fail("expired_ticket");

  const c = body.config;
  const config: TestConfig = {
    mode: c.mode,
    mode2: String(c.mode2),
    lang: c.mode === "code" ? null : c.lang,
    punctuation: c.mode !== "code" && c.punctuation === true,
    numbers: c.mode !== "code" && c.numbers === true,
    // The seed always comes from the ticket, never from the client.
    seed: ticket.seed,
    snippet: c.mode === "code" ? Number(c.snippet) : undefined,
  };
  if (!["time", "words", "code"].includes(config.mode)) return fail("invalid_config");

  const check = verifyTest(config, body.events, age);
  if (!check.ok) return fail(check.reason, 422);
  const r = check.result;

  // The client may already have saved its unverified copy; never let an id claim someone else's row.
  const { data: existing } = await admin.from("results").select("user_id").eq("id", body.id).maybeSingle();
  if (existing && existing.user_id !== auth.user.id) return fail("invalid_request");

  const { error } = await admin.from("results").upsert(
    {
      id: body.id,
      user_id: auth.user.id,
      mode: config.mode,
      mode2: config.mode2,
      lang: config.lang,
      punctuation: config.punctuation,
      numbers: config.numbers,
      wpm: r.wpm,
      raw: r.raw,
      acc: r.accuracy,
      consistency: r.consistency,
      duration_ms: Math.round(r.durationMs),
      chars: r.chars,
      key_stats: summarizeKeys(r),
      verified: true,
      ticket_nonce: ticket.nonce,
    },
    { onConflict: "id" },
  );
  if (error) {
    // 23505: this ticket already verified another result.
    return fail(error.code === "23505" ? "ticket_used" : "db_error", error.code === "23505" ? 409 : 500);
  }
  return NextResponse.json({ ok: true, wpm: r.wpm });
}
