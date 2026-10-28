"use client";

import { TICKET_KEY } from "./storageKeys";

/**
 * One pre-fetched test ticket, kept in localStorage so the first test after a page load
 * can already be verifiable. Tickets are only fetched for signed-in users.
 */
interface Stored {
  ticket: string;
  seed: number;
  /** when we received it; the server rejects tickets older than 6 h */
  at: number;
}

const MAX_AGE_MS = 5 * 60 * 60 * 1000;
const listeners = new Set<() => void>();
let fetching = false;

function read(): Stored | null {
  try {
    const t = JSON.parse(localStorage.getItem(TICKET_KEY) ?? "null") as Stored | null;
    return t && Date.now() - t.at < MAX_AGE_MS ? t : null;
  } catch {
    return null;
  }
}

function write(t: Stored | null) {
  try {
    if (t) localStorage.setItem(TICKET_KEY, JSON.stringify(t));
    else localStorage.removeItem(TICKET_KEY);
  } catch {
    // Storage unavailable: tests simply stay unverified.
  }
}

export const hasTicket = () => read() !== null;

/** Takes the stored ticket (if any) and starts fetching the next one. */
export function takeTicket(): Stored | null {
  const t = read();
  write(null);
  void refillTicket();
  return t;
}

/** Fetches a ticket unless one is already stored. Notifies listeners when a new one arrives. */
export async function refillTicket() {
  if (fetching || read()) return;
  fetching = true;
  try {
    const res = await fetch("/api/ticket", { cache: "no-store" });
    if (!res.ok) return;
    const { ticket, seed } = (await res.json()) as { ticket: string; seed: number };
    write({ ticket, seed, at: Date.now() });
    listeners.forEach((l) => l());
  } catch {
    // Offline or blocked: try again on the next test.
  } finally {
    fetching = false;
  }
}

export function onTicket(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export const clearTicket = () => write(null);
