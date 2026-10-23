"use client";

import { CircleAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/lib/sync";
import { useUi } from "@/lib/ui";

/**
 * Landing page for magic links and OAuth. The Supabase client exchanges the `?code=`
 * on start-up; we just wait for the session and move on to the progress page.
 */
export function AuthCallback() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const openAuth = useUi((s) => s.setAuthOpen);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace(`/${locale}/progress`);
      return;
    }
    const params = new URLSearchParams(window.location.search + window.location.hash.replace(/^#/, "&"));
    const timer = setTimeout(() => setFailed(true), params.has("error") ? 0 : 10000);
    return () => clearTimeout(timer);
  }, [user, router, locale]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-24 text-center">
      {failed ? (
        <div className="fade-up flex flex-col items-center gap-4">
          <CircleAlert size={28} className="text-error" />
          <p className="text-sub">{t.auth.callbackFailed}</p>
          <button
            type="button"
            onClick={() => openAuth(true)}
            className="rounded-xl bg-main px-5 py-2.5 text-sm font-medium text-bg transition hover:brightness-110"
          >
            {t.auth.tryAgain}
          </button>
        </div>
      ) : (
        <p className="flex items-center gap-2.5 text-sub">
          <Loader2 size={18} className="animate-spin text-main" /> {t.auth.callback}
        </p>
      )}
    </div>
  );
}
