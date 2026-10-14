import type { CharCounts } from "@/engine/types";
import type { TestMode } from "./settings";
import { HISTORY_KEY } from "./storageKeys";

export interface HistoryEntry {
  id: string;
  /** ISO timestamp */
  at: string;
  mode: TestMode;
  /** "30" seconds, "25" words, or a code language id */
  mode2: string;
  /** typing language for time/words tests */
  lang: string | null;
  punctuation: boolean;
  numbers: boolean;
  wpm: number;
  raw: number;
  acc: number;
  consistency: number;
  durationMs: number;
  chars: CharCounts;
}

/** Results are only comparable within the same mode configuration. */
export const modeKey = (e: Pick<HistoryEntry, "mode" | "mode2" | "lang" | "punctuation" | "numbers">) =>
  [e.mode, e.mode2, e.mode === "code" ? "" : e.lang, e.punctuation ? "p" : "", e.numbers ? "n" : ""].join("|");

/**
 * Storage boundary. The local implementation lives in the browser; a Supabase-backed
 * store with the same shape will replace it once accounts land.
 */
export interface HistoryStore {
  list(): HistoryEntry[];
  add(entry: HistoryEntry): void;
  clear(): void;
}

const KEY = HISTORY_KEY;
const MAX = 2000;

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

/** useSyncExternalStore adapter: re-reads when this tab or another tab changes the history. */
export function subscribeHistory(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

let cache: { raw: string | null; list: HistoryEntry[] } | null = null;
export function getHistorySnapshot(): HistoryEntry[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (!cache || cache.raw !== raw) {
    let list: HistoryEntry[] = [];
    try {
      list = raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
    } catch {}
    cache = { raw, list };
  }
  return cache.list;
}

export const localHistory: HistoryStore = {
  list: getHistorySnapshot,
  add(entry) {
    try {
      const all = [...getHistorySnapshot(), entry];
      localStorage.setItem(KEY, JSON.stringify(all.slice(-MAX)));
      notify();
    } catch {
      // Storage full or blocked (private mode) - the test still shows its result.
    }
  },
  clear() {
    try {
      localStorage.removeItem(KEY);
      notify();
    } catch {}
  },
};

export interface Comparison {
  previousBest: number | null;
  previousAvg: number | null;
  isBest: boolean;
  count: number;
}

export function compare(history: HistoryEntry[], entry: HistoryEntry): Comparison {
  const key = modeKey(entry);
  const same = history.filter((h) => modeKey(h) === key);
  if (same.length === 0) return { previousBest: null, previousAvg: null, isBest: false, count: 0 };
  const best = Math.max(...same.map((h) => h.wpm));
  const recent = same.slice(-10);
  const avg = recent.reduce((a, h) => a + h.wpm, 0) / recent.length;
  return { previousBest: best, previousAvg: Math.round(avg * 10) / 10, isBest: entry.wpm > best, count: same.length };
}

export const isSavable = (durationMs: number, wpm: number) => durationMs >= 3000 && wpm > 0;
