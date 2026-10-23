"use client";

import { AtSign, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { saveUsername, useAuth, USERNAME_RE } from "@/lib/sync";
import { useUi } from "@/lib/ui";

const DISMISS_KEY = "kf:username-later";

/**
 * Asks for a public username. Opens by itself once after sign-in when the account has
 * none (unless postponed this session), and on demand from the account menu or leaderboard.
 */
export function UsernameDialog() {
  const { t } = useI18n();
  const open = useUi((s) => s.usernameOpen);
  const setOpen = useUi((s) => s.setUsernameOpen);
  const profile = useAuth((s) => s.profile);
  const user = useAuth((s) => s.user);
  const ref = useRef<HTMLDialogElement>(null);
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "taken" | "invalid" | "error">("idle");

  useEffect(() => {
    if (!user || profile !== null) return;
    let postponed = false;
    try {
      postponed = sessionStorage.getItem(DISMISS_KEY) === user.id;
    } catch {}
    if (!postponed) setOpen(true);
  }, [user, profile, setOpen]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const close = () => {
    if (user && !profile) {
      try {
        sessionStorage.setItem(DISMISS_KEY, user.id);
      } catch {}
    }
    setOpen(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = value.trim();
    if (!USERNAME_RE.test(name)) {
      setState("invalid");
      return;
    }
    setState("saving");
    const result = await saveUsername(name);
    if (result === "ok") {
      setState("idle");
      setOpen(false);
    } else setState(result);
  };

  const message =
    state === "taken" ? t.profile.taken : state === "invalid" ? t.profile.invalid : state === "error" ? t.auth.error : null;

  return (
    <dialog
      ref={ref}
      onClose={close}
      className="m-auto w-[min(92vw,400px)] rounded-2xl border border-line bg-raised p-0 text-text shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={submit} className="p-7" noValidate>
        <h2 className="text-lg font-semibold">{t.profile.title}</h2>
        <p className="mt-1 text-sm text-sub">{t.profile.body}</p>

        <label htmlFor="username" className="mt-6 mb-1.5 block text-xs font-medium text-sub">
          {t.profile.label}
        </label>
        <div className="relative">
          <AtSign size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sub" />
          <input
            id="username"
            autoComplete="username"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={20}
            value={value}
            onChange={(e) => {
              setValue(e.target.value.replace(/[^A-Za-z0-9_]/g, ""));
              if (state !== "saving") setState("idle");
            }}
            placeholder={profile?.username ?? t.profile.placeholder}
            aria-invalid={!!message}
            aria-describedby="username-rules"
            className="w-full rounded-xl border border-line bg-bg py-2.5 pr-3.5 pl-9 font-mono text-sm text-text outline-none transition-colors placeholder:text-sub/60 focus:border-main"
          />
        </div>
        <p id="username-rules" role={message ? "alert" : undefined} className={`mt-2 text-xs ${message ? "text-error" : "text-sub"}`}>
          {message ?? t.profile.rules}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="rounded-lg px-4 py-2.5 text-sm text-sub transition-colors hover:text-text"
          >
            {profile ? t.settings.close : t.profile.later}
          </button>
          <button
            type="submit"
            disabled={state === "saving"}
            className="flex items-center gap-2 rounded-xl bg-main px-5 py-2.5 text-sm font-medium text-bg transition hover:brightness-110 disabled:opacity-70"
          >
            {state === "saving" && <Loader2 size={15} className="animate-spin" />}
            {state === "saving" ? t.profile.saving : t.profile.save}
          </button>
        </div>
      </form>
    </dialog>
  );
}
