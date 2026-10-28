/** A unit the user types. In code mode `indent` is auto-skipped whitespace rendered before the word. */
export interface Word {
  text: string;
  /** Separator that must be typed after the word: a space, or Enter for a line break. */
  sep: " " | "\n";
  indent: string;
}

export type CharClass = "letter" | "digit" | "symbol" | "space";

export interface Keystroke {
  /** ms since test start */
  t: number;
  /** expected character ("" when typing past the end of a word) */
  expected: string;
  typed: string;
  correct: boolean;
}

export interface SecondSample {
  second: number;
  wpm: number;
  raw: number;
  errors: number;
}

export interface CharCounts {
  correct: number;
  incorrect: number;
  extra: number;
  missed: number;
}

export interface KeyStat {
  key: string;
  hits: number;
  misses: number;
  /** mean ms between the previous keystroke and this key when typed correctly */
  avgMs: number;
}

export interface BigramStat {
  /** two consecutive letters, e.g. "th" */
  pair: string;
  count: number;
  /** mean ms from the first letter to the second, both typed correctly */
  avgMs: number;
}

/**
 * Compact per-test key data kept with each result so weak keys can be found across tests:
 * k: key -> [hits, misses, avgMs], b: bigram -> [count, avgMs].
 */
export interface KeySummary {
  k: Record<string, [number, number, number]>;
  b: Record<string, [number, number]>;
}

export interface ClassStat {
  cls: CharClass;
  total: number;
  errors: number;
  accuracy: number;
  avgMs: number;
}

export interface TestResult {
  wpm: number;
  raw: number;
  accuracy: number;
  consistency: number;
  durationMs: number;
  chars: CharCounts;
  samples: SecondSample[];
  keys: KeyStat[];
  bigrams: BigramStat[];
  classes: ClassStat[];
}
