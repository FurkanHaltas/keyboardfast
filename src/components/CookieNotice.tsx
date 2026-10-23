"use client";

import { Cookie } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const KEY = "kf:consent";
/** Bump when the kind of storage changes (e.g. optional cookies are added) to ask again. */
const VERSION = 1;

/**
 * Informational notice: the site only uses strictly necessary storage, so there is
 * nothing to opt into yet. Once optional cookies exist this becomes a real choice.
 */
export function CookieNotice() {
  const { t, locale } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = (JSON.parse(localStorage.getItem(KEY) ?? "null") as { v?: number } | null)?.v === VERSION;
    } catch {}
    // Shown after mount so server and client markup match.
    const id = setTimeout(() => setShow(!seen), 600);
    return () => clearTimeout(id);
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, essentialOnly: true, at: new Date().toISOString() }));
    } catch {}
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label={t.cookie.more}
      className="fade-up fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-xl flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-line bg-raised/95 px-5 py-4 text-sm shadow-2xl shadow-black/30 backdrop-blur sm:bottom-5"
    >
      <Cookie size={18} className="shrink-0 text-main" aria-hidden />
      <p className="min-w-0 flex-1 text-text/90">
        {t.cookie.text}{" "}
        <Link href={`/${locale}/cookies`} className="whitespace-nowrap text-main underline-offset-2 hover:underline">
          {t.cookie.more}
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="ml-auto rounded-xl bg-main px-4 py-2 font-medium text-bg transition hover:brightness-110"
      >
        {t.cookie.ok}
      </button>
    </div>
  );
}
