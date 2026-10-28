"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { THEMES, useSettings, type Theme } from "@/lib/settings";
import { useUi } from "@/lib/ui";

const SWATCH: Record<Theme, [bg: string, main: string, text: string]> = {
  night: ["#111317", "#f5b041", "#e8eaee"],
  paper: ["#f6f3ee", "#d9480f", "#2b2722"],
  ocean: ["#0b1622", "#5ec8e5", "#dbe7f3"],
  forest: ["#121a15", "#8fd694", "#e3ece5"],
  ember: ["#1a1311", "#ff7a45", "#f1e4dc"],
  mist: ["#eef1f5", "#3b5bdb", "#1f2733"],
};

export function SettingsDialog() {
  const { t } = useI18n();
  const open = useUi((s) => s.settingsOpen);
  const setOpen = useUi((s) => s.setSettingsOpen);
  const s = useSettings();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === ref.current && setOpen(false)}
      className="m-auto w-[min(92vw,460px)] rounded-2xl border border-line bg-raised p-0 text-text shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      {/* Content only exists while open, so search engines don't index dialog text on every page. */}
      {open && (
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t.settings.title}</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.settings.close}
              className="rounded-lg p-1.5 text-sub transition-colors hover:text-text"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-sub">
            {t.settings.theme}
          </p>
          <div
            className="mb-7 grid grid-cols-3 gap-2"
            role="radiogroup"
            aria-label={t.settings.theme}
          >
            {THEMES.map((th) => {
              const [bg, main, text] = SWATCH[th];
              const active = s.theme === th;
              return (
                <button
                  key={th}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => s.set({ theme: th })}
                  style={{ background: bg, color: text }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium ring-2 transition ${
                    active ? "ring-main" : "ring-transparent hover:ring-line"
                  }`}
                >
                  {th}
                  <span
                    className="size-3 rounded-full"
                    style={{ background: main }}
                  />
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <Toggle
              label={t.settings.liveWpm}
              value={s.liveWpm}
              onChange={(v) => s.set({ liveWpm: v })}
            />
            <Toggle
              label={t.settings.smoothCaret}
              value={s.smoothCaret}
              onChange={(v) => s.set({ smoothCaret: v })}
            />
          </div>
        </div>
      )}
    </dialog>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg py-2 text-sm">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-main" : "bg-line"}`}
      >
        <span
          className={`absolute top-1 left-1 size-4 rounded-full bg-bg transition-transform ${value ? "translate-x-5" : ""}`}
        />
      </button>
    </label>
  );
}
