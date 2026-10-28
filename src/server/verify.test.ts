import { describe, expect, it } from "vitest";
import { mulberry32 } from "@/engine/generate";
import { buildTest, type TestConfig } from "@/lib/createTest";
import { issueTicket, readTicket } from "./ticket";
import { checkRhythm, verifyTest } from "./verify";

/** Types a test the way the browser would, with human-like irregular gaps. */
function typeTest(cfg: TestConfig, gap: () => number, until = Infinity) {
  const setup = buildTest(cfg)!;
  const e = setup.engine;
  let t = 0;
  for (let w = 0; e.status !== "finished" && t < until; w++) {
    const word = e.words[w];
    for (const ch of word.text) e.input(ch, (t += gap()));
    e.input(word.sep, (t += gap()));
  }
  if (cfg.mode === "time") e.tick(Number(cfg.mode2) * 1000);
  return e;
}

const human = () => {
  const rng = mulberry32(7);
  return () => Math.round(60 + rng() * 180);
};

describe("verifyTest", () => {
  const words: TestConfig = { mode: "words", mode2: "25", lang: "en", punctuation: false, numbers: false, seed: 42 };

  it("accepts an honest replay and recomputes the same result", () => {
    const e = typeTest(words, human());
    const check = verifyTest(words, e.events, 60_000);
    expect(check.ok).toBe(true);
    if (check.ok) expect(check.result.wpm).toBeCloseTo(e.result!.wpm, 0);
  });

  it("replays timed tests, including refilled words", () => {
    const cfg: TestConfig = { ...words, mode: "time", mode2: "15" };
    const e = typeTest(cfg, human(), 16_000);
    const check = verifyTest(cfg, e.events, 20_000);
    expect(check.ok).toBe(true);
    if (check.ok) expect(check.result.durationMs).toBe(15_000);
  });

  it("rejects a log typed against different text (wrong seed)", () => {
    const e = typeTest(words, human());
    const check = verifyTest({ ...words, seed: 43 }, e.events, 60_000);
    expect(check.ok && check.result.accuracy > 90).toBe(false);
  });

  it("rejects a test that finished faster than the ticket allows", () => {
    const e = typeTest(words, human());
    expect(verifyTest(words, e.events, 1_000)).toEqual({ ok: false, reason: "too_fast_for_ticket" });
  });

  it("rejects metronomic and injected input", () => {
    expect(verifyTest(words, typeTest(words, () => 120).events, 60_000)).toEqual({ ok: false, reason: "robotic" });
    expect(checkRhythm(typeTest(words, () => 0).events)).toBe("injected");
  });

  it("rejects malformed logs", () => {
    expect(verifyTest(words, "nope", 60_000)).toEqual({ ok: false, reason: "invalid_events" });
    expect(verifyTest(words, [[5, "a"], [1, "b"]], 60_000)).toEqual({ ok: false, reason: "invalid_events" });
  });
});

describe("tickets", () => {
  it("round-trips and rejects tampering", () => {
    process.env.TICKET_SECRET = "x".repeat(32);
    const { ticket, seed } = issueTicket();
    expect(readTicket(ticket)?.seed).toBe(seed);
    const [body, mac] = ticket.split(".");
    const forged = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(body, "base64url").toString()), seed: 1 }));
    expect(readTicket(`${forged.toString("base64url")}.${mac}`)).toBeNull();
  });
});
