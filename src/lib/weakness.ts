import { classify } from "@/engine/stats";
import type { HistoryEntry } from "./history";

export interface KeyInsight {
  key: string;
  hits: number;
  misses: number;
  /** misses / (hits + misses) */
  errorRate: number;
  avgMs: number;
  /** 1 = average for this user; higher is weaker (error rate weighs more than speed) */
  score: number;
}

export interface Weakness {
  /** every letter with enough data, for the heatmap */
  keys: KeyInsight[];
  /** the weakest letters, strongest first */
  weakKeys: string[];
  /** letter pairs that are clearly slower than this user's average */
  slowBigrams: string[];
  /** tests the analysis is based on */
  tests: number;
}

const RECENT = 40;
const MIN_KEY_SAMPLES = 12;
const MIN_BIGRAM_SAMPLES = 6;

/**
 * Aggregates the key data of the most recent tests in one typing language. Letters only:
 * digits and symbols depend on the mode and would drown out the signal.
 */
export function analyzeWeakness(history: readonly HistoryEntry[], lang: string): Weakness {
  const recent = history.filter((e) => e.keys && e.mode !== "code" && e.lang === lang).slice(-RECENT);
  const keys = new Map<string, { hits: number; misses: number; ms: number; n: number }>();
  const pairs = new Map<string, { n: number; ms: number }>();

  for (const e of recent) {
    for (const [raw, [hits, misses, avgMs]] of Object.entries(e.keys!.k)) {
      if (classify(raw) !== "letter") continue;
      const key = raw.toLocaleLowerCase(lang);
      const a = keys.get(key) ?? { hits: 0, misses: 0, ms: 0, n: 0 };
      a.hits += hits;
      a.misses += misses;
      if (avgMs > 0) {
        a.ms += avgMs * hits;
        a.n += hits;
      }
      keys.set(key, a);
    }
    for (const [pair, [n, avgMs]] of Object.entries(e.keys!.b)) {
      const a = pairs.get(pair) ?? { n: 0, ms: 0 };
      a.n += n;
      a.ms += avgMs * n;
      pairs.set(pair, a);
    }
  }

  const base = [...keys.entries()]
    .filter(([, a]) => a.hits + a.misses >= MIN_KEY_SAMPLES)
    .map(([key, a]) => ({
      key,
      hits: a.hits,
      misses: a.misses,
      errorRate: a.misses / (a.hits + a.misses),
      avgMs: a.n ? a.ms / a.n : 0,
    }));
  const meanErr = mean(base.map((k) => k.errorRate)) || 0.01;
  const meanMs = mean(base.filter((k) => k.avgMs > 0).map((k) => k.avgMs)) || 1;
  const insights: KeyInsight[] = base.map((k) => ({
    ...k,
    // Small floor on the error term so a perfect typist's tiny differences aren't amplified.
    score: 0.6 * ((k.errorRate + 0.01) / (meanErr + 0.01)) + 0.4 * (k.avgMs ? k.avgMs / meanMs : 1),
  }));

  const weakKeys = [...insights]
    .filter((k) => k.score > 1.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((k) => k.key);

  const bigramList = [...pairs.entries()].filter(([, a]) => a.n >= MIN_BIGRAM_SAMPLES).map(([pair, a]) => ({ pair, ms: a.ms / a.n }));
  const meanPair = mean(bigramList.map((b) => b.ms));
  const slowBigrams = bigramList
    .filter((b) => b.ms > meanPair * 1.3)
    .sort((a, b) => b.ms - a.ms)
    .slice(0, 5)
    .map((b) => b.pair);

  return { keys: insights, weakKeys, slowBigrams, tests: recent.length };
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
