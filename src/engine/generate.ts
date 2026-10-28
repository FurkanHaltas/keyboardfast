import type { Word } from "./types";

export type Rng = () => number;

/** Small seeded PRNG so tests are reproducible. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T>(arr: readonly T[], rng: Rng) => arr[Math.floor(rng() * arr.length)];

export interface WordGenOptions {
  /** BCP 47 tag used for locale-aware capitalisation (e.g. Turkish i -> İ) */
  locale: string;
  punctuation: boolean;
  numbers: boolean;
  rng?: Rng;
}

/**
 * Builds a stateful generator so punctuation flows naturally across refills
 * (a sentence started in one batch is continued in the next).
 */
export function createWordStream(list: readonly string[], opts: WordGenOptions) {
  const rng = opts.rng ?? Math.random;
  let prev = "";
  let sentenceStart = true;
  let sinceStop = 0;

  const next = (): Word => {
    let w = pick(list, rng);
    for (let i = 0; i < 4 && w === prev && list.length > 1; i++) w = pick(list, rng);
    prev = w;

    if (opts.numbers && rng() < 0.1) {
      w = String(Math.floor(rng() * 10 ** (1 + Math.floor(rng() * 4))));
    }

    if (opts.punctuation) {
      if (sentenceStart) w = w.charAt(0).toLocaleUpperCase(opts.locale) + w.slice(1);
      sentenceStart = false;
      sinceStop++;
      const r = rng();
      if (sinceStop > 3 && r < 0.14) {
        w += pick([".", ".", ".", "?", "!"], rng);
        sentenceStart = true;
        sinceStop = 0;
      } else if (sinceStop > 1 && r < 0.24) {
        w += pick([",", ",", ",", ";", ":"], rng);
      } else if (r > 0.985) {
        w = `"${w}"`;
      } else if (r > 0.975) {
        w = `(${w})`;
      }
    }
    return { text: w, sep: " ", indent: "" };
  };

  return (count: number): Word[] => Array.from({ length: count }, next);
}

/**
 * Turns a code snippet into words. Leading indentation becomes auto-skipped `indent`,
 * runs of inner spaces collapse to one, and blank lines are dropped.
 */
export function codeToWords(code: string): Word[] {
  const words: Word[] = [];
  for (const raw of code.replace(/\t/g, "  ").split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    const indent = line.match(/^ */)![0];
    const tokens = line.trim().split(/ +/);
    tokens.forEach((text, i) => {
      words.push({ text, sep: i === tokens.length - 1 ? "\n" : " ", indent: i === 0 ? indent : "" });
    });
  }
  return words;
}

/**
 * Practice text: words are drawn with extra weight for each weak letter and slow letter
 * pair they contain, so the weak spots come up often while the text stays real words.
 */
export function createPracticeStream(list: readonly string[], focus: { keys: string[]; bigrams: string[] }, rng: Rng = Math.random) {
  const weights = list.map((w) => {
    let weight = 1;
    for (const k of focus.keys) if (w.includes(k)) weight += 3 * w.split(k).length - 3;
    for (const b of focus.bigrams) if (w.includes(b)) weight += 4;
    return weight;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let prev = "";
  const next = (): Word => {
    let w = prev;
    for (let tries = 0; tries < 4 && w === prev; tries++) {
      let r = rng() * total;
      let i = 0;
      while (r >= weights[i] && i < weights.length - 1) r -= weights[i++];
      w = list[i];
    }
    prev = w;
    return { text: w, sep: " ", indent: "" };
  };
  return (count: number): Word[] => Array.from({ length: count }, next);
}
