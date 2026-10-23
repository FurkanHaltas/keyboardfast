"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { CONTACT_EMAIL } from "@/lib/site";

export function Footer() {
  const { t, locale } = useI18n();
  const links = [
    { href: `/${locale}/privacy`, label: t.footer.privacy },
    { href: `/${locale}/cookies`, label: t.footer.cookies },
    { href: `/${locale}/terms`, label: t.footer.terms },
  ];
  return (
    <footer className="flex flex-col gap-4 py-8 text-xs text-sub sm:flex-row sm:items-center sm:justify-between">
      <span className="hidden items-center gap-2 sm:flex">
        <Kbd>tab</Kbd> {t.test.restart}
      </span>
      <nav aria-label="legal" className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-text">
            {l.label}
          </Link>
        ))}
        <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-text">
          {t.footer.contact}
        </a>
        <span>
          © 2026 keyboardfast · {t.footer.rights}
        </span>
      </nav>
    </footer>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-line bg-raised px-1.5 py-0.5 font-mono text-[0.7rem] text-text/80">
      {children}
    </kbd>
  );
}
