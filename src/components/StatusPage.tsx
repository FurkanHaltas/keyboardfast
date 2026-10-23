"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

/** Shared layout for the 404 and error pages. */
export function StatusPage({ code, title, body, action }: { code: string; title: string; body: string; action?: React.ReactNode }) {
  const { t, locale } = useI18n();
  return (
    <div className="fade-up flex flex-1 flex-col items-center justify-center gap-3 pb-20 text-center">
      <p className="font-mono text-7xl font-semibold tracking-tight text-main">{code}</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="max-w-sm text-sub">{body}</p>
      <div className="mt-3 flex gap-2">
        {action}
        <Link href={`/${locale}`} className="rounded-xl bg-main px-5 py-2.5 font-medium text-bg transition hover:brightness-110">
          {t.notFound.home}
        </Link>
      </div>
    </div>
  );
}
