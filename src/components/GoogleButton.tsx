"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useSettings } from "@/lib/settings";
import { GOOGLE_CLIENT_ID } from "@/lib/supabase";
import { signInWithGoogle, signInWithGoogleIdToken } from "@/lib/sync";

/** Minimal typing for the parts of Google Identity Services we use. */
type Gsi = {
  initialize(config: {
    client_id: string;
    callback: (res: { credential: string }) => void;
    nonce: string;
    itp_support?: boolean;
  }): void;
  renderButton(el: HTMLElement, options: Record<string, string | number>): void;
};
declare global {
  interface Window {
    google?: { accounts: { id: Gsi } };
  }
}

const SCRIPT = "https://accounts.google.com/gsi/client";
const LIGHT_THEMES = new Set(["paper", "mist"]);
let loading: Promise<Gsi> | null = null;

function loadGsi(): Promise<Gsi> {
  loading ??= new Promise<Gsi>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => (window.google ? resolve(window.google.accounts.id) : reject(new Error("gsi missing")));
    s.onerror = () => reject(new Error("gsi blocked"));
    document.head.appendChild(s);
  }).catch((e: unknown) => {
    loading = null; // let a later attempt retry, e.g. after a blocker is turned off
    throw e;
  });
  return loading;
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Google's own sign-in button. Unlike the redirect flow, Google's dialog names the site
 * ("keyboardfast") instead of the Supabase project domain. If the script can't load
 * (blockers, strict privacy settings) we fall back to the redirect flow.
 */
export function GoogleButton({
  redirectTo,
  onDone,
  onError,
}: {
  redirectTo: () => string;
  onDone: () => void;
  onError: () => void;
}) {
  const { t, locale } = useI18n();
  const theme = useSettings((s) => s.theme);
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => !cancelled && setState((s) => (s === "loading" ? "fallback" : s)), 4000);
    (async () => {
      try {
        const gsi = await loadGsi();
        const nonce = crypto.randomUUID();
        const hashed = await sha256Hex(nonce);
        if (cancelled || !ref.current) return;
        gsi.initialize({
          client_id: GOOGLE_CLIENT_ID,
          nonce: hashed,
          itp_support: true,
          callback: async ({ credential }) => {
            const error = await signInWithGoogleIdToken(credential, nonce);
            if (error) onError();
            else onDone();
          },
        });
        gsi.renderButton(ref.current, {
          type: "standard",
          theme: LIGHT_THEMES.has(theme) ? "outline" : "filled_black",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "center",
          width: Math.min(400, Math.round(ref.current.offsetWidth)),
          locale,
        });
        setState("ready");
      } catch {
        if (!cancelled) setState("fallback");
      }
    })();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
    // Callbacks are recreated each render; re-initialising for them would only flicker the button.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, locale]);

  if (state === "fallback") {
    return (
      <button
        type="button"
        onClick={async () => (await signInWithGoogle(redirectTo())) && onError()}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-bg px-4 py-2.5 text-sm font-medium transition-colors hover:border-sub"
      >
        <GoogleIcon /> {t.auth.google}
      </button>
    );
  }

  return (
    <div className="relative h-10 w-full">
      {state === "loading" && <div aria-hidden className="absolute inset-0 animate-pulse rounded-full bg-bg" />}
      <div ref={ref} className="flex w-full justify-center [color-scheme:normal]" />
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}
