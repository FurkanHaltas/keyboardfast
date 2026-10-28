import { NextResponse, type NextRequest } from "next/server";
import { isLocale, matchLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (first && isLocale(first)) return;

  const saved = request.cookies.get("locale")?.value;
  const locale = saved && isLocale(saved) ? saved : matchLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (icons, robots.txt, ...).
  matcher: ["/((?!_next|api/|.*\\..*).*)"],
};
