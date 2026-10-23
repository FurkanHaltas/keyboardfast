"use client";

import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { deleteMyAccount } from "@/lib/sync";

/** Explicit confirmation before permanently deleting the account. */
export function DeleteAccountDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<"idle" | "busy" | "failed">("idle");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const confirm = async () => {
    setState("busy");
    if (await deleteMyAccount()) {
      setState("idle");
      onClose();
    } else setState("failed");
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[min(92vw,420px)] rounded-2xl border border-line bg-raised p-0 text-text shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-7">
        <span className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-error/15 text-error">
          <TriangleAlert size={22} />
        </span>
        <h2 className="text-lg font-semibold">{t.account.deleteTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-sub">{t.account.deleteBody}</p>
        {state === "failed" && (
          <p role="alert" className="mt-3 text-sm text-error">
            {t.account.failed}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="rounded-lg px-4 py-2.5 text-sm text-sub transition-colors hover:text-text"
          >
            {t.account.cancel}
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={state === "busy"}
            className="flex items-center gap-2 rounded-xl bg-error px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-70"
          >
            {state === "busy" && <Loader2 size={15} className="animate-spin" />}
            {state === "busy" ? t.account.deleting : t.account.deleteAction}
          </button>
        </div>
      </div>
    </dialog>
  );
}
