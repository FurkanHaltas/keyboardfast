"use client";

import { ArrowLeft, Loader2, Mail, MailCheck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { GOOGLE_AUTH_ENABLED } from "@/lib/supabase";
import { signInWithEmail } from "@/lib/sync";
import { useUi } from "@/lib/ui";
import { GoogleButton } from "./GoogleButton";

type Step = { kind: "form"; error?: string } | { kind: "sending" } | { kind: "sent"; email: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function AuthDialog() {
  const { t, locale } = useI18n();
  const open = useUi((s) => s.authOpen);
  const setOpen = useUi((s) => s.setAuthOpen);
  const ref = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>({ kind: "form" });

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const redirectTo = () => `${window.location.origin}/${locale}/auth/callback`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStep({ kind: "form", error: t.auth.invalidEmail });
      return;
    }
    setStep({ kind: "sending" });
    const error = await signInWithEmail(value, redirectTo(), locale);
    setStep(error ? { kind: "form", error: t.auth.error } : { kind: "sent", email: value });
  };

  const close = () => {
    setOpen(false);
    // Reset after the closing transition so the dialog doesn't visibly jump.
    setTimeout(() => setStep({ kind: "form" }), 200);
  };

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      className="m-auto w-[min(92vw,420px)] rounded-2xl border border-line bg-raised p-0 text-text shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      {/* Content only exists while open, so search engines don't index dialog text on every page. */}
      {open && (
        <div className="relative p-7">
          <button
            type="button"
            onClick={close}
            aria-label={t.settings.close}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-sub transition-colors hover:text-text"
          >
            <X size={18} />
          </button>

          {step.kind === "sent" ? (
            <div className="fade-up py-2 text-center">
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-main/15 text-main">
                <MailCheck size={24} />
              </span>
              <h2 className="text-lg font-semibold">{t.auth.sentTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-sub">{renderWithEmail(t.auth.sentBody, step.email)}</p>
              <button
                type="button"
                onClick={() => setStep({ kind: "form" })}
                className="mx-auto mt-6 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-sub transition-colors hover:text-text"
              >
                <ArrowLeft size={15} /> {t.auth.useOther}
              </button>
            </div>
          ) : (
            <>
              <h2 className="pr-8 text-lg font-semibold">{t.auth.title}</h2>
              <p className="mt-1 text-sm text-sub">{t.auth.subtitle}</p>

              {GOOGLE_AUTH_ENABLED && (
                <>
                  <div className="mt-6">
                    <GoogleButton
                      redirectTo={redirectTo}
                      onDone={close}
                      onError={() => setStep({ kind: "form", error: t.auth.error })}
                    />
                  </div>
                  <div className="my-5 flex items-center gap-3 text-xs text-sub">
                    <span className="h-px flex-1 bg-line" />
                    {t.auth.or}
                    <span className="h-px flex-1 bg-line" />
                  </div>
                </>
              )}

              <form onSubmit={submit} className={GOOGLE_AUTH_ENABLED ? "" : "mt-6"} noValidate>
                <label htmlFor="auth-email" className="mb-1.5 block text-xs font-medium text-sub">
                  {t.auth.email}
                </label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  aria-invalid={step.kind === "form" && !!step.error}
                  className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-sub/70 focus:border-main"
                />
                {step.kind === "form" && step.error && (
                  <p role="alert" className="mt-2 text-xs text-error">
                    {step.error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={step.kind === "sending"}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-main px-4 py-2.5 text-sm font-medium text-bg transition hover:brightness-110 disabled:opacity-70"
                >
                  {step.kind === "sending" ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                  {step.kind === "sending" ? t.auth.sending : t.auth.sendLink}
                </button>
                <p className="mt-3 text-center text-xs text-sub">{t.auth.noPassword}</p>
              </form>
              <p className="mt-5 border-t border-line pt-4 text-center text-[0.7rem] leading-relaxed text-sub">
                <ConsentText
                  text={t.auth.consent}
                  links={[`/${locale}/terms`, `/${locale}/privacy`]}
                  onNavigate={close}
                />
              </p>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}

/** Turns each [bracketed] phrase into a link, in order, so translations control the grammar around them. */
function ConsentText({ text, links, onNavigate }: { text: string; links: string[]; onNavigate: () => void }) {
  let i = 0;
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, k) => {
        const m = part.match(/^\[(.+)\]$/);
        if (!m) return <span key={k}>{part}</span>;
        const href = links[i++] ?? links[0];
        return (
          <Link
            key={k}
            href={href}
            onClick={onNavigate}
            className="text-text underline underline-offset-2 hover:text-main"
          >
            {m[1]}
          </Link>
        );
      })}
    </>
  );
}

/** Renders a "{email}" placeholder with the address emphasised. */
function renderWithEmail(template: string, email: string) {
  const [before, after = ""] = template.split("{email}");
  return (
    <>
      {before}
      <span className="font-medium text-text">{email}</span>
      {after}
    </>
  );
}
