import { describe, expect, it } from "vitest";
import { createPracticeStream, mulberry32 } from "@/engine/generate";
import type { KeySummary } from "@/engine/types";
import type { HistoryEntry } from "./history";
import { analyzeWeakness } from "./weakness";

const entry = (k: KeySummary["k"], b: KeySummary["b"] = {}): HistoryEntry => ({
  id: crypto.randomUUID(),
  at: new Date().toISOString(),
  mode: "time",
  mode2: "30",
  lang: "en",
  punctuation: false,
  numbers: false,
  wpm: 60,
  raw: 65,
  acc: 95,
  consistency: 80,
  durationMs: 30000,
  chars: { correct: 0, incorrect: 0, extra: 0, missed: 0 },
  keys: { k, b },
});

describe("analyzeWeakness", () => {
  it("ranks error-prone and slow letters as weak and ignores other languages", () => {
    const k = { a: [40, 1, 150], s: [40, 1, 150], d: [40, 1, 150], f: [40, 1, 150], q: [20, 8, 260], z: [20, 2, 400] } satisfies KeySummary["k"];
    const history = [entry({ ...k }), entry({ ...k }), { ...entry({ x: [5, 50, 900] }), lang: "tr" }];
    const w = analyzeWeakness(history, "en");
    expect(w.tests).toBe(2);
    expect(w.weakKeys[0]).toBe("q");
    expect(w.weakKeys).toContain("z");
    expect(w.weakKeys).not.toContain("a");
    expect(w.weakKeys).not.toContain("x");
  });

  it("finds slow bigrams", () => {
    const b: KeySummary["b"] = { th: [10, 100], he: [10, 110], in: [10, 105], er: [10, 300] };
    const w = analyzeWeakness([entry({ a: [20, 0, 100] }, b)], "en");
    expect(w.slowBigrams).toEqual(["er"]);
  });
});

describe("createPracticeStream", () => {
  it("favours words with focus letters", () => {
    const list = ["aaa", "bbb", "ccc", "qat", "dog", "cat"];
    const words = createPracticeStream(list, { keys: ["q"], bigrams: [] }, mulberry32(1))(300);
    const q = words.filter((w) => w.text.includes("q")).length;
    expect(q / words.length).toBeGreaterThan(0.3);
  });
});
