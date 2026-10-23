"use client";

import { LogIn, LogOut, UserPen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { signOut, useAuth } from "@/lib/sync";
import { useUi } from "@/lib/ui";

/** Sign-in button when signed out; avatar with a small menu when signed in. */
export function AccountMenu() {
  const { t } = useI18n();
  const { user, ready, profile } = useAuth();
  const openAuth = useUi((s) => s.setAuthOpen);
  const openUsername = useUi((s) => s.setUsernameOpen);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  // Reserve the space while the session is being restored to avoid layout shift.
  if (!ready) return <span className="inline-block size-9" aria-hidden />;

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => openAuth(true)}
        className="flex items-center gap-2 rounded-lg px-2 py-2 text-sub transition-colors hover:text-text sm:px-3"
        aria-label={t.auth.signIn}
      >
        <LogIn size={17} strokeWidth={2} />
        <span className="hidden sm:inline">{t.auth.signIn}</span>
      </button>
    );
  }

  const initial = (profile?.username ?? user.email ?? "?").charAt(0).toUpperCase();
  return (
    <div ref={ref} className="relative ml-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={user.email ?? t.auth.signedInAs}
        className="flex size-8 items-center justify-center rounded-full bg-main text-sm font-semibold text-bg transition hover:brightness-110"
      >
        {initial}
      </button>
      {open && (
        <div
          role="menu"
          className="fade-up absolute right-0 z-30 mt-2 w-60 overflow-hidden rounded-xl border border-line bg-raised p-1 shadow-xl shadow-black/20"
        >
          <div className="px-3 py-2.5">
            <p className="text-xs text-sub">{t.auth.signedInAs}</p>
            {profile && <p className="truncate font-mono text-sm text-text">@{profile.username}</p>}
            <p className="truncate text-xs text-sub">{user.email}</p>
          </div>
          <div className="my-1 h-px bg-line" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              openUsername(true);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-text transition-colors hover:bg-line"
          >
            <UserPen size={15} /> {profile ? t.profile.change : t.leaderboard.chooseUsername}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              void signOut();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-text transition-colors hover:bg-line"
          >
            <LogOut size={15} /> {t.auth.signOut}
          </button>
        </div>
      )}
    </div>
  );
}
