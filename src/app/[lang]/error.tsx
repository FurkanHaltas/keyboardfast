"use client";

import { RotateCcw } from "lucide-react";
import { StatusPage } from "@/components/StatusPage";
import { useI18n } from "@/i18n/I18nProvider";

export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const { t } = useI18n();
  return (
    <StatusPage
      code=":("
      title={t.errorPage.title}
      body={t.errorPage.body}
      action={
        <button
          type="button"
          onClick={() => retry()}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sub transition-colors hover:bg-raised hover:text-text"
        >
          <RotateCcw size={16} /> {t.errorPage.retry}
        </button>
      }
    />
  );
}
