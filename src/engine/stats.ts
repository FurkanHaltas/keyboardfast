import type {
  CharClass,
  CharCounts,
  ClassStat,
  KeyStat,
  Keystroke,
  SecondSample,
  TestResult,
  Word,
} from "./types";

const round = (n: number, d = 0) => {
  const f = 10 ** d;
  return Math.round(n * f) / f;
};

export function classify(ch: string): CharClass {
  if (ch === " " || ch === "\n") return "space";
  if (/\p{L}/u.test(ch)) return "letter";
  if (/\p{N}/u.test(ch)) return "digit";
  return "symbol";
}

/**
 * Characters that count toward net WPM: every char of a correctly typed word plus its
 * separator, and the matching prefix of the word currently being typed.
 */
export function countWpmChars(words: Word[], typed: string[], index: number): number {
  let n = 0;
  for (let i = 0; i < index; i++) {
    if (typed[i] === words[i].text) n += words[i].text.length + 1;
  }
  const cur = words[index];
  const t = typed[index] ?? "";
  if (cur) {
    if (t === cur.text) n += t.length;
    else for (let j = 0; j < t.length && t[j] === cur.text[j]; j++) n++;
  }
  return n;
}

export function countChars(words: Word[], typed: string[], index: number, finished: boolean): CharCounts {
  const c: CharCounts = { correct: 0, incorrect: 0, extra: 0, missed: 0 };
  const last = Math.min(index, words.length - 1);
  for (let i = 0; i <= last; i++) {
    const text = words[i].text;
    const t = typed[i] ?? "";
    for (let j = 0; j < t.length; j++) {
      if (j >= text.length) c.extra++;
      else if (t[j] === text[j]) c.correct++;
      else c.incorrect++;
    }
    // The word being typed when time ran out isn't "missed" - it just wasn't reached.
    const committed = i < index || (finished && i === index && t.length > 0 && i === words.length - 1);
    if (committed && t.length < text.length) c.missed += text.length - t.length;
  }
  return c;
}

/** Kogasa-style consistency: maps the coefficient of variation of raw speed to 0-100. */
export function consistency(values: number[]): number {
  if (values.length < 2) return 100;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (mean === 0) return 0;
  const sd = Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length);
  const cv = sd / mean;
  return round(100 * (1 - Math.tanh(cv + cv ** 3 / 3 + cv ** 5 / 5)), 1);
}

const PAUSE_MS = 2000;

export function keyStats(strokes: Keystroke[]): KeyStat[] {
  const map = new Map<string, { hits: number; misses: number; ms: number; n: number }>();
  strokes.forEach((s, i) => {
    if (!s.expected) return;
    const key = s.expected === "\n" ? "⏎" : s.expected;
    const e = map.get(key) ?? { hits: 0, misses: 0, ms: 0, n: 0 };
    if (s.correct) {
      e.hits++;
      const dt = i > 0 ? s.t - strokes[i - 1].t : 0;
      if (i > 0 && dt < PAUSE_MS) {
        e.ms += dt;
        e.n++;
      }
    } else e.misses++;
    map.set(key, e);
  });
  return [...map.entries()].map(([key, e]) => ({
    key,
    hits: e.hits,
    misses: e.misses,
    avgMs: e.n ? round(e.ms / e.n) : 0,
  }));
}

export function classStats(strokes: Keystroke[]): ClassStat[] {
  const acc = new Map<CharClass, { total: number; errors: number; ms: number; n: number }>();
  strokes.forEach((s, i) => {
    if (!s.expected) return;
    const cls = classify(s.expected);
    const e = acc.get(cls) ?? { total: 0, errors: 0, ms: 0, n: 0 };
    e.total++;
    if (!s.correct) e.errors++;
    else if (i > 0 && s.t - strokes[i - 1].t < PAUSE_MS) {
      e.ms += s.t - strokes[i - 1].t;
      e.n++;
    }
    acc.set(cls, e);
  });
  const order: CharClass[] = ["letter", "digit", "symbol", "space"];
  return order
    .filter((c) => acc.has(c))
    .map((cls) => {
      const e = acc.get(cls)!;
      return {
        cls,
        total: e.total,
        errors: e.errors,
        accuracy: round(((e.total - e.errors) / e.total) * 100, 1),
        avgMs: e.n ? round(e.ms / e.n) : 0,
      };
    });
}

export function buildResult(args: {
  words: Word[];
  typed: string[];
  index: number;
  strokes: Keystroke[];
  samples: SecondSample[];
  durationMs: number;
}): TestResult {
  const { words, typed, index, strokes, samples, durationMs } = args;
  const minutes = Math.max(durationMs, 1) / 60000;
  const correctStrokes = strokes.filter((s) => s.correct).length;
  return {
    wpm: round(countWpmChars(words, typed, index) / 5 / minutes, 1),
    raw: round(strokes.length / 5 / minutes, 1),
    accuracy: strokes.length ? round((correctStrokes / strokes.length) * 100, 1) : 0,
    consistency: consistency(samples.map((s) => s.raw)),
    durationMs: Math.round(durationMs),
    chars: countChars(words, typed, index, true),
    samples,
    keys: keyStats(strokes),
    classes: classStats(strokes),
  };
}
