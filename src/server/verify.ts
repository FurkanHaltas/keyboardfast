import { replay } from "@/engine/engine";
import type { TestResult } from "@/engine/types";
import { buildTest, type TestConfig } from "@/lib/createTest";

/** Fastest result we accept at all; sustained world-record pace is around 220–250 WPM. */
export const MAX_WPM = 260;
const MAX_EVENTS = 20000;

export type Rejection =
  | "invalid_config"
  | "invalid_events"
  | "incomplete"
  | "too_fast_for_ticket"
  | "superhuman"
  | "injected"
  | "robotic";

/**
 * Rebuilds the test from its config + seed, replays the keystroke log and checks that it
 * looks like a person typing. The returned result is computed here, never taken from the client.
 */
export function verifyTest(
  cfg: TestConfig,
  events: unknown,
  ticketAgeMs: number,
): { ok: true; result: TestResult } | { ok: false; reason: Rejection } {
  if (!isEventLog(events)) return { ok: false, reason: "invalid_events" };
  const setup = buildTest(cfg);
  if (!setup) return { ok: false, reason: "invalid_config" };
  if (cfg.mode === "time" && ![15, 30, 60, 120].includes(Number(cfg.mode2))) return { ok: false, reason: "invalid_config" };

  const done = replay(setup.engine, events, cfg.mode === "time" ? Number(cfg.mode2) : undefined);
  if (!done?.result) return { ok: false, reason: "incomplete" };
  const result = done.result;

  // The ticket was issued before the test started, so it must be at least as old as the test.
  if (ticketAgeMs + 1000 < result.durationMs) return { ok: false, reason: "too_fast_for_ticket" };
  if (result.wpm > MAX_WPM || result.raw > MAX_WPM * 1.3) return { ok: false, reason: "superhuman" };
  const human = checkRhythm(events);
  if (human) return { ok: false, reason: human };
  return { ok: true, result };
}

function isEventLog(v: unknown): v is [number, string][] {
  if (!Array.isArray(v) || v.length < 10 || v.length > MAX_EVENTS) return false;
  let last = 0;
  for (const e of v) {
    if (!Array.isArray(e) || e.length !== 2) return false;
    const [t, k] = e as unknown[];
    if (typeof t !== "number" || !Number.isFinite(t) || t < last || t > 3_600_000) return false;
    if (typeof k !== "string" || k.length === 0 || k.length > 2) return false;
    last = t;
  }
  return true;
}

/**
 * Human typing is irregular: intervals between keys vary a lot (coefficient of variation
 * usually 0.4–0.9). Scripts tend to be metronomic, and pasted or injected text arrives in
 * bursts of near-zero gaps. Thresholds are deliberately loose to avoid flagging real people.
 */
export function checkRhythm(events: readonly [number, string][]): Rejection | null {
  const gaps: number[] = [];
  for (let i = 1; i < events.length; i++) gaps.push(events[i][0] - events[i - 1][0]);
  if (gaps.length < 20) return null;
  const instant = gaps.filter((g) => g < 4).length / gaps.length;
  if (instant > 0.2) return "injected";
  // Ignore long pauses (thinking, hesitation) so they don't inflate the variation.
  const typing = gaps.filter((g) => g < 1000);
  const mean = typing.reduce((a, b) => a + b, 0) / typing.length;
  const sd = Math.sqrt(typing.reduce((a, g) => a + (g - mean) ** 2, 0) / typing.length);
  if (typing.length >= 40 && sd / mean < 0.15) return "robotic";
  return null;
}
