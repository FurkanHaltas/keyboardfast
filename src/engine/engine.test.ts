import { describe, expect, it } from "vitest";
import { TypingEngine } from "./engine";
import { codeToWords, createWordStream, mulberry32 } from "./generate";
import { consistency } from "./stats";
import type { Word } from "./types";

const w = (...texts: string[]): Word[] => texts.map((text) => ({ text, sep: " ", indent: "" }));

function type(e: TypingEngine, s: string, start = 0, gap = 100) {
  let t = start;
  for (const ch of s) {
    e.input(ch, t);
    t += gap;
  }
  return t;
}

describe("TypingEngine – words mode", () => {
  it("finishes when the last word is completed and scores a perfect run", () => {
    const e = new TypingEngine({ words: w("hello", "world"), limit: { kind: "words" } });
    type(e, "hello world");
    expect(e.status).toBe("finished");
    const r = e.result!;
    expect(r.accuracy).toBe(100);
    expect(r.chars).toEqual({ correct: 10, incorrect: 0, extra: 0, missed: 0 });
    // 11 chars over 1000ms -> 11/5/(1/60) = 132
    expect(r.wpm).toBe(132);
  });

  it("computes per-second wpm from the keystroke log even without ticks", () => {
    const e = new TypingEngine({ words: w("aaaa", "bbbb", "cccc", "dddd"), limit: { kind: "words" } });
    type(e, "aaaa bbbb cccc dddd", 0, 100); // 19 chars, one every 100ms, no tick() calls
    // At t=1000: "aaaa bbbb c" (11 net chars) -> 11/5*60 = 132
    expect(e.samples[0].wpm).toBe(132);
    expect(e.samples.at(-1)!.wpm).toBe(Math.round(e.result!.wpm));
  });

  it("does not start the clock on a leading space", () => {
    const e = new TypingEngine({ words: w("a"), limit: { kind: "words" } });
    e.input(" ", 0);
    expect(e.status).toBe("idle");
  });

  it("counts extra, incorrect and missed characters", () => {
    const e = new TypingEngine({ words: w("cat", "dog", "end"), limit: { kind: "words" } });
    type(e, "caat dg end");
    const r = e.result!;
    expect(r.chars.extra).toBe(1);
    expect(r.chars.incorrect).toBe(2); // "a" for "t" in cat, "g" for "o" in dog
    expect(r.chars.missed).toBe(1);
    expect(r.accuracy).toBeLessThan(100);
  });

  it("allows going back only into a word with mistakes", () => {
    const e = new TypingEngine({ words: w("ab", "cd", "ef"), limit: { kind: "words" } });
    type(e, "ab ");
    e.backspace(false, 500);
    expect(e.index).toBe(1); // "ab" is correct, so no stepping back

    type(e, "cx ", 600);
    expect(e.index).toBe(2);
    e.backspace(false, 1000);
    expect(e.index).toBe(1);
    e.backspace(false, 1100);
    expect(e.typed[1]).toBe("c");
  });

  it("clears a whole word with ctrl+backspace", () => {
    const e = new TypingEngine({ words: w("hello", "x"), limit: { kind: "words" } });
    type(e, "hel");
    e.backspace(true, 400);
    expect(e.typed[0]).toBe("");
  });

  it("handles Turkish characters exactly", () => {
    const e = new TypingEngine({ words: w("ığdır", "şişe"), limit: { kind: "words" } });
    type(e, "ığdır şişe");
    expect(e.result!.accuracy).toBe(100);
  });
});

describe("TypingEngine – time mode", () => {
  it("ends at the time limit, samples every second and refills words", () => {
    const stream = createWordStream(["aa", "bb", "cc"], { locale: "en", punctuation: false, numbers: false, rng: mulberry32(1) });
    const e = new TypingEngine({ words: stream(50), limit: { kind: "time", seconds: 3 }, more: () => stream(50) });
    let t = 0;
    while (e.status !== "finished") {
      const word = e.words[e.index];
      type(e, word.text + " ", t, 50);
      t += (word.text.length + 1) * 50;
      e.tick(t);
    }
    expect(e.result!.durationMs).toBe(3000);
    expect(e.samples.map((s) => s.second)).toEqual([1, 2, 3]);
    expect(e.result!.accuracy).toBe(100);
    expect(e.result!.wpm).toBeGreaterThan(200);
    expect(e.words.length).toBeGreaterThan(50);
  });
});

describe("code mode", () => {
  it("splits code into words with auto-skipped indentation and line separators", () => {
    const words = codeToWords("if (x) {\n    return  y;\n\n}\n");
    expect(words.map((x) => x.text)).toEqual(["if", "(x)", "{", "return", "y;", "}"]);
    expect(words[2].sep).toBe("\n");
    expect(words[3].indent).toBe("    ");
  });

  it("requires Enter at line ends and tracks symbol accuracy", () => {
    const e = new TypingEngine({ words: codeToWords("a();\nb"), limit: { kind: "words" } });
    type(e, "a();\nb");
    expect(e.status).toBe("finished");
    const r = e.result!;
    expect(r.accuracy).toBe(100);
    expect(r.classes.find((c) => c.cls === "symbol")?.total).toBe(3);
  });

  it("marks a space typed where a newline is expected as an error", () => {
    const e = new TypingEngine({ words: codeToWords("a\nb"), limit: { kind: "words" } });
    type(e, "a b");
    expect(e.result!.accuracy).toBeLessThan(100);
  });
});

describe("generation & stats", () => {
  it("capitalises with locale rules", () => {
    const s = createWordStream(["istanbul"], { locale: "tr", punctuation: true, numbers: false, rng: mulberry32(3) });
    expect(s(1)[0].text.startsWith("İ")).toBe(true);
  });

  it("consistency is 100 for a perfectly even pace and lower for an uneven one", () => {
    expect(consistency([80, 80, 80])).toBe(100);
    expect(consistency([40, 120, 60, 100])).toBeLessThan(80);
  });
});
