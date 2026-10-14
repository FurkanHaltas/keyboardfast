"use client";

import { Check, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALE_NAMES, LOCALES, rememberLocale, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

export function LanguageMenu() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const choose = (l: Locale) => {
    setOpen(false);
    rememberLocale(l);
    router.push(pathname.replace(/^\/[^/]+/, `/${l}`));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sub transition-colors hover:text-text sm:px-3"
      >
        <Globe size={17} strokeWidth={2} />
        <span className="font-mono text-xs uppercase">{locale}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t.nav.language}
          className="fade-up absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-line bg-raised p-1 shadow-xl shadow-black/20"
        >
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => choose(l)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-text transition-colors hover:bg-line"
              >
                {LOCALE_NAMES[l]}
                {l === locale && <Check size={15} className="text-main" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
