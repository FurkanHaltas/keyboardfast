import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

/**
 * Stateless test tickets: the server hands out a random seed and the time it did so,
 * signed with TICKET_SECRET. A result is only verifiable with a ticket, so the text
 * can't be chosen by the client and a test can't finish faster than real time allows.
 */
export interface Ticket {
  /** word generator seed */
  seed: number;
  /** issued at, ms since epoch */
  iat: number;
  /** unique id; stored with the result so a ticket verifies at most one result */
  nonce: string;
}

/** Tickets are pre-fetched and kept on the device, so they stay valid for a while. */
export const TICKET_TTL_MS = 6 * 60 * 60 * 1000;

const secret = () => process.env.TICKET_SECRET ?? "";
export const ticketsEnabled = () => secret().length >= 32;

const sign = (body: string) => createHmac("sha256", secret()).update(body).digest("base64url");

export function issueTicket(): { ticket: string; seed: number } {
  const t: Ticket = { seed: randomInt(0, 2 ** 32 - 1), iat: Date.now(), nonce: randomBytes(12).toString("base64url") };
  const body = Buffer.from(JSON.stringify(t)).toString("base64url");
  return { ticket: `${body}.${sign(body)}`, seed: t.seed };
}

export function readTicket(ticket: string): Ticket | null {
  const [body, mac] = ticket.split(".");
  if (!body || !mac || !ticketsEnabled()) return null;
  const expected = Buffer.from(sign(body));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const t = JSON.parse(Buffer.from(body, "base64url").toString()) as Ticket;
    return Number.isInteger(t.seed) && Number.isFinite(t.iat) && typeof t.nonce === "string" ? t : null;
  } catch {
    return null;
  }
}
