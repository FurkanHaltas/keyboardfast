"use client";

import { ArrowDown, ArrowRight, ArrowUp, ChartLine, Lightbulb, LogIn, RotateCcw, Trophy } from "lucide-react";
import { useEffect, useRef } from "react";
import { Kbd } from "@/components/Footer";
import { LineChart } from "@/components/charts/LineChart";
import type { TestResult } from "@/engine/types";
import { fmt } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import type { Comparison } from "@/lib/history";
import { useAuth } from "@/lib/sync";
import { useUi } from "@/lib/ui";

interface Props {
  result: TestResult;
  comparison: Comparison | null;
  saved: boolean;
  modeLabel: string;
  onNext: () => void;
  onRepeat: () => void;
}

const keyLabel = (k: string) => (k === " " ? "␣" : k);

export function Results({ result, comparison, saved, modeLabel, onNext, onRepeat }: Props) {
  const { t } = useI18n();
  const nextRef = useRef<HTMLButtonElement>(null);
  const r = result;

  // Start at the top with the primary action focused, without the browser scrolling to it.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    nextRef.current?.focus({ preventScroll: true });
  }, []);
  const samples = r.samples;
  const secondLabel = (i: number) => String(Math.ceil(samples[i]?.second ?? i + 1));

  const keys = [...r.keys]
    .filter((k) => k.hits + k.misses > 0)
    .sort((a, b) => b.misses - a.misses || b.avgMs - a.avgMs)
    .slice(0, 8);
  const anyMiss = keys.some((k) => k.misses > 0);

  const letter = r.classes.find((c) => c.cls === "letter");
  const symbol = r.classes.find((c) => c.cls === "symbol");
  const symbolRatio = letter?.avgMs && symbol?.avgMs ? symbol.avgMs / letter.avgMs : 0;

  return (
    <section className="fade-up space-y-10" aria-live="polite">
      <div className="grid items-start gap-8 lg:grid-cols-[200px_1fr]">
        <div className="flex gap-10 lg:flex-col lg:gap-6">
          <BigStat label={t.results.wpm} value={Math.round(r.wpm)} title={`${r.wpm}`} />
          <BigStat label={t.results.acc} value={`${Math.round(r.accuracy)}%`} title={`${r.accuracy}%`} />
          <ComparisonBlock wpm={r.wpm} comparison={comparison} saved={saved} />
        </div>

        <div className="min-w-0">
          <h3 className="sr-only">{t.results.speedChart}</h3>
          <LineChart
            ariaLabel={t.results.speedChart}
            height={230}
            series={[
              { id: "wpm", label: t.results.wpm, values: samples.map((s) => s.wpm), color: "var(--main)" },
              { id: "raw", label: t.results.raw, values: samples.map((s) => s.raw), color: "var(--sub)", dashed: true },
            ]}
            markers={{
              label: t.results.errors,
              color: "var(--error)",
              points: samples.flatMap((s, i) => (s.errors ? [{ index: i, value: s.errors }] : [])),
            }}
            xLabel={secondLabel}
            tooltipTitle={(i) => `${t.results.second} ${secondLabel(i)}`}
          />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-[1.6fr_repeat(4,1fr)]">
        <SmallStat label={t.progress.mode} value={<span className="font-sans text-base">{modeLabel}</span>} />
        <SmallStat label={t.results.raw} value={Math.round(r.raw)} />
        <SmallStat
          label={t.results.characters}
          value={`${r.chars.correct}/${r.chars.incorrect}/${r.chars.extra}/${r.chars.missed}`}
          title={`${t.results.correct} / ${t.results.incorrect} / ${t.results.extra} / ${t.results.missed}`}
        />
        <SmallStat label={t.results.consistency} value={`${Math.round(r.consistency)}%`} />
        <SmallStat label={t.results.time} value={`${(r.durationMs / 1000).toFixed(r.durationMs < 10000 ? 1 : 0)}s`} />
      </dl>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel title={t.results.keysTitle} hint={anyMiss ? t.results.keysHint : t.results.keysEmpty}>
          <ul className="grid grid-cols-4 gap-2">
            {keys.map((k) => (
              <li
                key={k.key}
                className="flex flex-col items-center rounded-xl border border-line bg-bg/40 px-2 py-2.5"
                title={`${fmt(t.results.missesN, { n: k.misses })} · ${fmt(t.results.avgMs, { n: k.avgMs })}`}
              >
                <span className={`font-mono text-xl ${k.misses ? "text-error" : "text-text"}`}>{keyLabel(k.key)}</span>
                <span className="mt-1 text-[0.68rem] text-sub">
                  {k.misses ? fmt(t.results.missesN, { n: k.misses }) : fmt(t.results.avgMs, { n: k.avgMs })}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t.results.classTitle}>
          <ul className="space-y-3.5">
            {r.classes.map((c) => (
              <li key={c.cls}>
                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span className="text-text">{t.results.classes[c.cls]}</span>
                  <span className="font-mono text-xs text-sub">
                    <span className="text-text">{c.accuracy}%</span> · {fmt(t.results.avgMs, { n: c.avgMs })}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-main transition-[width] duration-700" style={{ width: `${c.accuracy}%` }} />
                </div>
              </li>
            ))}
          </ul>
          {symbolRatio >= 1.15 && (
            <p className="mt-5 flex items-start gap-2 text-sm text-sub">
              <Lightbulb size={16} className="mt-0.5 shrink-0 text-main" />
              {fmt(t.results.symbolInsight, { x: symbolRatio.toFixed(1) })}
            </p>
          )}
        </Panel>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          ref={nextRef}
          type="button"
          onClick={onNext}
          className="group flex items-center gap-2 rounded-xl bg-main px-5 py-2.5 font-medium text-bg transition hover:brightness-110 active:scale-[0.98]"
        >
          {t.results.next}
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={onRepeat}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sub transition-colors hover:bg-raised hover:text-text"
        >
          <RotateCcw size={16} /> {t.results.repeat}
        </button>
        <span className="ml-1 hidden items-center gap-2 text-xs text-sub sm:flex">
          <Kbd>tab</Kbd>
        </span>
      </div>
    </section>
  );
}

function BigStat({ label, value, title }: { label: string; value: React.ReactNode; title?: string }) {
  return (
    <div title={title}>
      <div className="text-sm text-sub">{label}</div>
      <div className="font-mono text-6xl leading-none font-semibold tracking-tight text-main tabular-nums">{value}</div>
    </div>
  );
}

function SmallStat({ label, value, title }: { label: string; value: React.ReactNode; title?: string }) {
  return (
    <div title={title}>
      <dt className="text-xs text-sub">{label}</dt>
      <dd className="mt-1 font-mono text-xl text-text tabular-nums">{value}</dd>
    </div>
  );
}

function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-raised p-5">
      <h3 className="text-sm font-medium text-text">{title}</h3>
      {hint && <p className="mt-0.5 mb-4 text-xs text-sub">{hint}</p>}
      {!hint && <div className="mb-4" />}
      {children}
    </div>
  );
}

function ComparisonBlock({ wpm, comparison, saved }: { wpm: number; comparison: Comparison | null; saved: boolean }) {
  const { t } = useI18n();
  const user = useAuth((s) => s.user);
  const openAuth = useUi((s) => s.setAuthOpen);
  if (!saved) return <p className="max-w-48 text-xs text-sub">{t.results.invalid}</p>;
  // History-based comparison is a member feature.
  if (!user) {
    return (
      <div className="max-w-56 rounded-xl border border-line p-3.5 text-xs">
        <p className="flex items-center gap-1.5 font-medium text-text">
          <ChartLine size={14} className="text-main" /> {t.results.guestTitle}
        </p>
        <p className="mt-1 leading-relaxed text-sub">{t.results.guestBody}</p>
        <button
          type="button"
          onClick={() => openAuth(true)}
          className="mt-2.5 flex items-center gap-1 font-medium text-main transition hover:brightness-110"
        >
          <LogIn size={13} /> {t.auth.signIn}
        </button>
      </div>
    );
  }
  if (!comparison) return null;
  if (comparison.count === 0) return <p className="max-w-48 text-xs leading-relaxed text-sub">{t.results.firstTest}</p>;
  return (
    <div className="space-y-1.5 text-xs">
      {comparison.isBest && (
        <p className="flex items-center gap-1.5 font-medium text-main">
          <Trophy size={14} /> {t.results.newBest}
        </p>
      )}
      <Delta value={wpm - (comparison.previousAvg ?? 0)} label={t.results.vsAvg} />
      {!comparison.isBest && <Delta value={wpm - (comparison.previousBest ?? 0)} label={t.results.vsBest} />}
    </div>
  );
}

function Delta({ value, label }: { value: number; label: string }) {
  const up = value >= 0;
  const Icon = up ? ArrowUp : ArrowDown;
  return (
    <p className="flex items-center gap-1 text-sub">
      <Icon size={13} className={up ? "text-main" : "text-sub"} />
      <span className="font-mono text-text">
        {up ? "+" : ""}
        {value.toFixed(1)}
      </span>
      {label}
    </p>
  );
}
