"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 py-8 text-xs text-sub">
      <span className="flex items-center gap-2">
        <Kbd>tab</Kbd> {t.test.restart}
      </span>
      <span>keyboardfast</span>
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
