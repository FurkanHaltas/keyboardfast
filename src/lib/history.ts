import type { CharCounts, KeySummary } from "@/engine/types";
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
  /** per-key and bigram data for finding weak keys; absent on results saved before it existed */
  keys?: KeySummary;
}

/** Results are only comparable within the same mode configuration. */
export const modeKey = (e: Pick<HistoryEntry, "mode" | "mode2" | "lang" | "punctuation" | "numbers">) =>
  [e.mode, e.mode2, e.mode === "code" ? "" : e.lang, e.punctuation ? "p" : "", e.numbers ? "n" : ""].join("|");

const MAX = 2000;

/**
 * The local history is a per-scope cache: signed-out results live under HISTORY_KEY,
 * each account's synced copy under HISTORY_KEY:<userId>. The UI always reads the active scope.
 */
let scope: string | null = null;
const keyFor = (s: string | null) => (s ? `${HISTORY_KEY}:${s}` : HISTORY_KEY);

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function setHistoryScope(userId: string | null) {
  if (scope === userId) return;
  scope = userId;
  cache = null;
  notify();
}

export const getHistoryScope = () => scope;

/** useSyncExternalStore adapter: re-reads when this tab or another tab changes the history. */
export function subscribeHistory(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === keyFor(scope) && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function readHistory(s: string | null): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(keyFor(s));
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function writeHistory(s: string | null, list: HistoryEntry[]) {
  try {
    if (list.length) localStorage.setItem(keyFor(s), JSON.stringify(list.slice(-MAX)));
    else localStorage.removeItem(keyFor(s));
  } catch {
    // Storage full or blocked (private mode) - the test still shows its result.
  }
  if (s === scope) notify();
}

let cache: { key: string; raw: string | null; list: HistoryEntry[] } | null = null;
export function getHistorySnapshot(): HistoryEntry[] {
  const key = keyFor(scope);
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {}
  if (!cache || cache.key !== key || cache.raw !== raw) {
    let list: HistoryEntry[] = [];
    try {
      list = raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
    } catch {}
    cache = { key, raw, list };
  }
  return cache.list;
}

/** Appends to the active scope's local cache. Remote persistence lives in sync.ts. */
export function addLocal(entry: HistoryEntry) {
  writeHistory(scope, [...getHistorySnapshot(), entry]);
}
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
