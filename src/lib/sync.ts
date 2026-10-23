"use client";

import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { addLocal, getHistoryScope, readHistory, setHistoryScope, writeHistory, type HistoryEntry } from "./history";
import { supabase } from "./supabase";

interface AuthState {
  user: { id: string; email: string | null } | null;
  /** undefined while loading, null when the user has not picked a username yet */
  profile: { username: string } | null | undefined;
  /** true once the stored session has been checked */
  ready: boolean;
  syncing: boolean;
}

export const useAuth = create<AuthState>()(() => ({ user: null, profile: undefined, ready: false, syncing: false }));

interface Row {
  id: string;
  created_at: string;
  mode: HistoryEntry["mode"];
  mode2: string;
  lang: string | null;
  punctuation: boolean;
  numbers: boolean;
  wpm: number;
  raw: number;
  acc: number;
  consistency: number;
  duration_ms: number;
  chars: HistoryEntry["chars"];
}

const toRow = (e: HistoryEntry): Row => ({
  id: e.id,
  created_at: e.at,
  mode: e.mode,
  mode2: e.mode2,
  lang: e.lang,
  punctuation: e.punctuation,
  numbers: e.numbers,
  wpm: e.wpm,
  raw: e.raw,
  acc: e.acc,
  consistency: e.consistency,
  duration_ms: e.durationMs,
  chars: e.chars,
});

const fromRow = (r: Row): HistoryEntry => ({
  id: r.id,
  at: r.created_at,
  mode: r.mode,
  mode2: r.mode2,
  lang: r.lang,
  punctuation: r.punctuation,
  numbers: r.numbers,
  wpm: Number(r.wpm),
  raw: Number(r.raw),
  acc: Number(r.acc),
  consistency: Number(r.consistency),
  durationMs: r.duration_ms,
  chars: r.chars,
});

// Results that were saved while offline (or whose upload failed) wait here until the next flush.
const pendingKey = (uid: string) => `kf:pending:${uid}`;
function readPending(uid: string): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(pendingKey(uid)) ?? "[]") as HistoryEntry[];
  } catch {
    return [];
  }
}
function writePending(uid: string, list: HistoryEntry[]) {
  try {
    if (list.length) localStorage.setItem(pendingKey(uid), JSON.stringify(list));
    else localStorage.removeItem(pendingKey(uid));
  } catch {}
}

/** Inserts rows, skipping ids that already exist so retries and imports are safe. */
async function upload(entries: HistoryEntry[]) {
  for (let i = 0; i < entries.length; i += 500) {
    const { error } = await supabase()
      .from("results")
      .upsert(entries.slice(i, i + 500).map(toRow), { onConflict: "id", ignoreDuplicates: true });
    if (error) throw error;
  }
}

async function flushPending(uid: string) {
  const pending = readPending(uid);
  if (!pending.length) return;
  try {
    await upload(pending);
    writePending(uid, []);
  } catch {
    // Keep them queued; the next save or sign-in retries.
  }
}

/** Replaces the account's local cache with the server copy plus anything still queued. */
async function pull(uid: string) {
  const { data, error } = await supabase()
    .from("results")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(2000);
  if (error || getHistoryScope() !== uid) return;
  const remote = (data as Row[]).map(fromRow);
  const ids = new Set(remote.map((r) => r.id));
  const queued = readPending(uid).filter((p) => !ids.has(p.id));
  writeHistory(uid, [...remote, ...queued].sort((a, b) => a.at.localeCompare(b.at)));
}

async function syncAccount(uid: string) {
  useAuth.setState({ syncing: true });
  await flushPending(uid);
  await pull(uid);
  useAuth.setState({ syncing: false });
}

/** Saves a finished test locally and, when signed in, to the account. */
export function saveResult(entry: HistoryEntry) {
  addLocal(entry);
  const uid = useAuth.getState().user?.id;
  if (!uid) return;
  writePending(uid, [...readPending(uid), entry]);
  void flushPending(uid);
}

/** Results recorded on this device while signed out. */
export const anonymousResults = () => readHistory(null);

/** Moves this device's signed-out results into the current account. */
export async function importAnonymous() {
  const uid = useAuth.getState().user?.id;
  if (!uid) return false;
  const local = readHistory(null);
  try {
    await upload(local);
  } catch {
    return false;
  }
  writeHistory(null, []);
  await pull(uid);
  return true;
}

export async function clearAllResults() {
  const uid = useAuth.getState().user?.id;
  if (uid) {
    const { error } = await supabase().from("results").delete().eq("user_id", uid);
    if (error) return false;
    writePending(uid, []);
  }
  writeHistory(getHistoryScope(), []);
  return true;
}

let started = false;

/** Restores the session and keeps the history scope in step with the signed-in user. */
export function startAuth() {
  if (started) return;
  started = true;
  const apply = (user: User | null) => {
    const prev = useAuth.getState().user?.id ?? null;
    if (user?.id !== prev) useAuth.setState({ profile: undefined });
    useAuth.setState({ user: user ? { id: user.id, email: user.email ?? null } : null, ready: true });
    setHistoryScope(user?.id ?? null);
    if (user && user.id !== prev) {
      void syncAccount(user.id);
      void loadProfile(user.id);
    }
  };
  const client = supabase();
  void client.auth.getSession().then(({ data }) => apply(data.session?.user ?? null));
  client.auth.onAuthStateChange((_event, session) => {
    // Defer: calling Supabase inside this callback can deadlock the auth lock.
    setTimeout(() => apply(session?.user ?? null), 0);
  });
}

export async function signInWithEmail(email: string, redirectTo: string) {
  const { error } = await supabase().auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
  return error?.message ?? null;
}

export async function signInWithGoogle(redirectTo: string) {
  const { error } = await supabase().auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
  return error?.message ?? null;
}

export async function signOut() {
  await supabase().auth.signOut();
}

async function loadProfile(uid: string) {
  const { data, error } = await supabase().from("profiles").select("username").eq("id", uid).maybeSingle();
  if (error || useAuth.getState().user?.id !== uid) return;
  useAuth.setState({ profile: data ? { username: data.username as string } : null });
}

export const USERNAME_RE = /^[A-Za-z0-9_]{3,20}$/;

/** Creates or renames the profile. */
export async function saveUsername(username: string): Promise<"ok" | "taken" | "invalid" | "error"> {
  const uid = useAuth.getState().user?.id;
  if (!uid) return "error";
  if (!USERNAME_RE.test(username)) return "invalid";
  const { error } = await supabase().from("profiles").upsert({ id: uid, username }, { onConflict: "id" });
  if (error) return error.code === "23505" ? "taken" : "error";
  useAuth.setState({ profile: { username } });
  return "ok";
}

export interface LeaderboardRow {
  rank: number;
  username: string;
  is_me: boolean;
  wpm: number;
  raw: number;
  acc: number;
  consistency: number;
  created_at: string;
}

export async function fetchLeaderboard(mode: string, mode2: string, lang: string | null): Promise<LeaderboardRow[] | null> {
  const { data, error } = await supabase().rpc("leaderboard", {
    p_mode: mode,
    p_mode2: mode2,
    p_lang: lang,
    p_limit: 50,
  });
  if (error) return null;
  return (data as LeaderboardRow[]).map((r) => ({
    ...r,
    rank: Number(r.rank),
    wpm: Number(r.wpm),
    raw: Number(r.raw),
    acc: Number(r.acc),
    consistency: Number(r.consistency),
  }));
}