"use client";

import { Crosshair, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu } from "@/components/Menu";
import { KEYBOARD_ROWS } from "@/content/keyboards";
import { WORD_LANGUAGE_NAMES, WORD_LANGUAGES, type WordLanguage } from "@/content/words";
import { fmt } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import type { HistoryEntry } from "@/lib/history";
import { useSettings } from "@/lib/settings";
import { analyzeWeakness, type KeyInsight } from "@/lib/weakness";

/** Score 0.8 or less reads as strong, 1.8 or more as clearly weak. */
const heat = (score: number) => Math.min(1, Math.max(0, (score - 0.8) / 1));

/**
 * Keyboard-shaped heatmap of the user's weak letters in one typing language, plus a
 * shortcut into practice mode that drills exactly those keys.
 */
export function KeyHeatmap({ history }: { history: readonly HistoryEntry[] }) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const setSettings = useSettings((s) => s.set);

  const langs = useMemo(() => {
    const seen = new Set(history.filter((e) => e.keys && e.lang).map((e) => e.lang as WordLanguage));
    return WORD_LANGUAGES.filter((l) => seen.has(l));
  }, [history]);
  const latest = [...history].reverse().find((e) => e.keys && e.lang)?.lang as WordLanguage | undefined;
  const [picked, setPicked] = useState<WordLanguage | null>(null);
  const lang = picked ?? latest;

  const analysis = useMemo(() => (lang ? analyzeWeakness(history, lang) : null), [history, lang]);
  if (!lang || !analysis) return null;
  const byKey = new Map(analysis.keys.map((k) => [k.key, k]));
  const hasData = analysis.keys.length >= 5;

  const practice = () => {
    setSettings({ mode: "practice", wordLang: lang });
    router.push(`/${locale}`);
  };

  return (
    <section className="rounded-2xl bg-raised p-5 sm:p-6">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium">{t.progress.heatmapTitle}</h2>
        {langs.length > 1 && (
          <div className="rounded-xl bg-bg text-sm">
            <Menu
              value={lang}
              options={langs}
              label={(l) => WORD_LANGUAGE_NAMES[l]}
              onChange={setPicked}
              ariaLabel={t.config.typingLanguage}
              icon={<Globe size={14} />}
            />
          </div>
        )}
      </div>

      {!hasData ? (
        <p className="py-6 text-sm text-sub">{t.progress.heatmapEmpty}</p>
      ) : (
        <>
          <p className="mb-5 text-xs text-sub">
            {fmt(t.progress.heatmapBody, { n: analysis.tests, lang: WORD_LANGUAGE_NAMES[lang] })}
          </p>
          <div
            className="flex flex-col items-center gap-1 sm:gap-1.5"
            role="img"
            aria-label={t.progress.heatmapTitle}
            // Keys shrink with the viewport so the longest row (12 keys in Turkish) fits a phone.
            style={{ "--cols": Math.max(...KEYBOARD_ROWS[lang].map((r) => r.length)) + 1 } as React.CSSProperties}
          >
            {KEYBOARD_ROWS[lang].map((row, i) => (
              <div key={row} className="flex gap-1 sm:gap-1.5" style={{ paddingLeft: `calc(${i} * min(0.9rem, 3vw))` }}>
                {[...row].map((k) => (
                  <Key key={k} letter={k} insight={byKey.get(k)} tip={t.progress.keyTip} />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-sub">
              {t.progress.heatmapStrong}
              <span
                className="h-2 w-24 rounded-full"
                style={{ background: "linear-gradient(to right, var(--bg), color-mix(in oklab, var(--error) 75%, var(--bg)))" }}
              />
              {t.progress.heatmapWeak}
            </div>
            {analysis.slowBigrams.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-sub">
                {t.progress.slowPairs}
                {analysis.slowBigrams.map((b) => (
                  <kbd key={b} className="rounded-md bg-bg px-1.5 py-0.5 font-mono text-[0.75rem] text-text">
                    {b}
                  </kbd>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={practice}
              className="flex items-center gap-2 rounded-xl bg-main px-4 py-2 text-sm font-medium text-bg transition hover:brightness-110"
            >
              <Crosshair size={15} /> {t.progress.practiceCta}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function Key({ letter, insight, tip }: { letter: string; insight?: KeyInsight; tip: string }) {
  const h = insight ? heat(insight.score) : 0;
  const title = insight
    ? fmt(tip, { key: letter, acc: Math.round((1 - insight.errorRate) * 100), ms: Math.round(insight.avgMs) })
    : undefined;
  return (
    <span
      title={title}
      className={`flex aspect-square w-[min(2.5rem,calc((100vw-7rem)/var(--cols)))] shrink-0 items-center justify-center rounded-md border border-line font-mono text-xs sm:rounded-lg sm:text-sm ${
        insight ? "text-text" : "text-sub/40"
      } ${h > 0.6 ? "font-semibold" : ""}`}
      style={{ background: `color-mix(in oklab, var(--error) ${Math.round(h * 75)}%, var(--bg))` }}
    >
      {letter}
    </span>
  );
}
