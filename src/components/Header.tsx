"use client";

import { ChartLine, Keyboard, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { useUi } from "@/lib/ui";
import { LanguageMenu } from "./LanguageMenu";
import { SettingsDialog } from "./SettingsDialog";

export function Header() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const openSettings = useUi((s) => s.setSettingsOpen);

  const nav = [
    { href: `/${locale}`, label: t.nav.test, icon: Keyboard },
    { href: `/${locale}/progress`, label: t.nav.progress, icon: ChartLine },
  ];

  return (
    <header className="flex items-center justify-between gap-2 py-6 sm:gap-4 sm:py-8">
      <Link href={`/${locale}`} className="group flex items-center gap-2.5" aria-label="keyboardfast">
        <LogoMark />
        <span className="text-lg font-semibold tracking-tight text-text sm:text-[1.35rem]">
          keyboard<span className="text-main transition-colors">fast</span>
        </span>
      </Link>

      <nav className="flex items-center text-sm sm:gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:text-text sm:px-3 ${
                active ? "text-text" : "text-sub"
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => openSettings(true)}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sub transition-colors hover:text-text sm:px-3"
          aria-label={t.nav.settings}
        >
          <Settings2 size={17} strokeWidth={2} />
          <span className="hidden sm:inline">{t.nav.settings}</span>
        </button>
        <LanguageMenu />
      </nav>
      <SettingsDialog />
    </header>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className="size-7 shrink-0 sm:size-[30px]">
      <rect x="1.5" y="6.5" width="29" height="19" rx="5" fill="none" stroke="var(--sub)" strokeWidth="2" />
      <rect x="6" y="11" width="4" height="3.5" rx="1" fill="var(--sub)" />
      <rect x="12" y="11" width="4" height="3.5" rx="1" fill="var(--sub)" />
      <rect x="18" y="11" width="4" height="3.5" rx="1" fill="var(--sub)" />
      <rect x="9" y="17.5" width="14" height="3.5" rx="1.2" fill="var(--main)" className="origin-center transition-transform group-hover:scale-x-110" />
    </svg>
  );
}
