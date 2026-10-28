import { connection, NextResponse } from "next/server";
import { issueTicket, ticketsEnabled } from "@/server/ticket";

/** Hands out a signed test ticket (seed + issue time). See src/server/ticket.ts. */
export async function GET() {
  await connection();
  if (!ticketsEnabled()) return NextResponse.json({ error: "disabled" }, { status: 503 });
  return NextResponse.json(issueTicket(), { headers: { "Cache-Control": "no-store" } });
}
