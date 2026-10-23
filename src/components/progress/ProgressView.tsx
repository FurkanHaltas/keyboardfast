"use client";

import { ChartLine, CloudCheck, CloudUpload, Filter, Lock, LogIn, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { Menu } from "@/components/Menu";
import { fmt } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { getHistorySnapshot, modeKey, readHistory, subscribeHistory, type HistoryEntry } from "@/lib/history";
import { modeLabel } from "@/lib/modeLabel";
import { clearAllResults, importAnonymous, useAuth } from "@/lib/sync";
import { useUi } from "@/lib/ui";

const ALL = "__all";

function rolling(values: number[], window: number) {
  return values.map((_, i) => {
    const slice = values.slice(Math.max(0, i - window + 1), i + 1);
    return Math.round((slice.reduce((a, b) => a + b, 0) / slice.length) * 10) / 10;
  });
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

export function ProgressView() {
  const { t, locale } = useI18n();
  const history = useSyncExternalStore(subscribeHistory, getHistorySnapshot, () => null);
  const [filter, setFilter] = useState<string>(ALL);
  const user = useAuth((s) => s.user);
  const authReady = useAuth((s) => s.ready);
  const openAuth = useUi((s) => s.setAuthOpen);

  const modes = useMemo(() => {
    const map = new Map<string, HistoryEntry>();
    history?.forEach((h) => map.set(modeKey(h), h));
    return map;
  }, [history]);

  const rows = useMemo(
    () => (history ?? []).filter((h) => filter === ALL || modeKey(h) === filter),
    [history, filter],
  );

  if (!history || !authReady) return <div className="flex-1" aria-busy />;

  if (!user) {
    return (
      <div className="fade-up flex flex-1 flex-col items-center justify-center gap-4 pb-20 text-center">
        <span className="rounded-2xl bg-raised p-4 text-main">
          <Lock size={28} />
        </span>
        <h1 className="text-2xl font-semibold">{t.progress.lockedTitle}</h1>
        <p className="max-w-md text-sub">{t.progress.lockedBody}</p>
        <button
          type="button"
          onClick={() => openAuth(true)}
          className="mt-2 flex items-center gap-2 rounded-xl bg-main px-5 py-2.5 font-medium text-bg transition hover:brightness-110"
        >
          <LogIn size={17} /> {t.auth.signIn}
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="fade-up flex flex-1 flex-col items-center justify-center gap-4 pb-20 text-center">
        <ImportBanner />
        <span className="rounded-2xl bg-raised p-4 text-main">
          <ChartLine size={28} />
        </span>
        <h1 className="text-2xl font-semibold">{t.progress.title}</h1>
        <p className="max-w-sm text-sub">{t.progress.empty}</p>
        <Link href={`/${locale}`} className="mt-2 rounded-xl bg-main px-5 py-2.5 font-medium text-bg transition hover:brightness-110">
          {t.progress.startTest}
        </Link>
      </div>
    );
  }

  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" });
  const wpms = rows.map((r) => r.wpm);
  const accs = rows.map((r) => r.acc);
  const last10 = rows.slice(-10);
  const totalMs = rows.reduce((a, r) => a + r.durationMs, 0);
  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const seconds = Math.round((totalMs % 60_000) / 1000);
  const timeTyping = hours ? `${hours}h ${minutes}m` : minutes ? `${minutes}m ${seconds}s` : `${seconds}s`;
  const tooltipTitle = (i: number) => `${fmt(t.progress.testN, { n: i + 1 })} · ${dateFmt.format(new Date(rows[i].at))}`;

  const modeOptions = [ALL, ...modes.keys()];

  return (
    <div className="fade-up space-y-10 pb-12">
      <ImportBanner />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t.progress.title}</h1>
          <p className="mt-1 text-sm text-sub">{t.progress.subtitle}</p>
        </div>
        <div className="rounded-xl bg-raised text-sm">
          <Menu
            value={filter}
            options={modeOptions}
            label={(k) => (k === ALL ? t.progress.filterAll : modeLabel(modes.get(k)!, t))}
            onChange={setFilter}
            ariaLabel={t.progress.mode}
            icon={<Filter size={14} />}
          />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Tile label={t.progress.tests} value={rows.length} />
        <Tile label={t.progress.timeTyping} value={timeTyping} />
        <Tile label={t.progress.bestWpm} value={Math.round(Math.max(...wpms, 0))} accent />
        <Tile label={t.progress.avgWpm} value={Math.round(mean(last10.map((r) => r.wpm)))} />
        <Tile label={t.progress.avgAcc} value={`${Math.round(mean(last10.map((r) => r.acc)))}%`} />
      </dl>

      <ChartCard title={t.progress.wpmChart}>
        <LineChart
          ariaLabel={t.progress.wpmChart}
          height={260}
          series={[
            { id: "wpm", label: t.results.wpm, values: wpms, color: "var(--sub)", dots: true, noLine: true },
            { id: "avg", label: t.progress.rolling, values: rolling(wpms, 10), color: "var(--main)" },
          ]}
          xLabel={(i) => String(i + 1)}
          tooltipTitle={tooltipTitle}
        />
      </ChartCard>

      <ChartCard title={t.progress.accChart}>
        <LineChart
          ariaLabel={t.progress.accChart}
          height={200}
          yMin={Math.max(0, Math.floor(Math.min(...accs, 100) / 10) * 10 - 10)}
          yMax={100}
          series={[
            { id: "acc", label: t.results.acc, values: accs, color: "var(--sub)", dots: true, noLine: true, format: (v) => `${v}%` },
            { id: "avg", label: t.progress.rolling, values: rolling(accs, 10), color: "var(--main)", format: (v) => `${v}%` },
          ]}
          xLabel={(i) => String(i + 1)}
          tooltipTitle={tooltipTitle}
        />
      </ChartCard>

      <section>
        <h2 className="mb-3 text-sm font-medium">{t.progress.recent}</h2>
        <div className="overflow-x-auto rounded-2xl bg-raised">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-xs text-sub">
                <th className="px-5 py-3 font-normal">{t.progress.date}</th>
                <th className="px-3 py-3 font-normal">{t.progress.mode}</th>
                <th className="px-3 py-3 text-right font-normal">{t.results.wpm}</th>
                <th className="px-3 py-3 text-right font-normal">{t.results.acc}</th>
                <th className="px-3 py-3 text-right font-normal">{t.results.raw}</th>
                <th className="px-5 py-3 text-right font-normal">{t.results.consistency}</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              {rows
                .slice(-25)
                .reverse()
                .map((r) => (
                  <tr key={r.id} className="border-t border-line">
                    <td className="px-5 py-2.5 font-sans text-sub">{dateFmt.format(new Date(r.at))}</td>
                    <td className="px-3 py-2.5 font-sans">{modeLabel(r, t)}</td>
                    <td className="px-3 py-2.5 text-right text-main">{Math.round(r.wpm)}</td>
                    <td className="px-3 py-2.5 text-right">{Math.round(r.acc)}%</td>
                    <td className="px-3 py-2.5 text-right text-sub">{Math.round(r.raw)}</td>
                    <td className="px-5 py-2.5 text-right text-sub">{Math.round(r.consistency)}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-sub">
        {user ? (
          <p className="flex items-center gap-1.5">
            <CloudCheck size={15} className="text-main" /> {t.progress.syncedNote}
          </p>
        ) : (
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {t.progress.signInNote}
            <button
              type="button"
              onClick={() => openAuth(true)}
              className="flex items-center gap-1 font-medium text-main transition hover:brightness-110"
            >
              <LogIn size={13} /> {t.auth.signIn}
            </button>
          </p>
        )}
        <button
          type="button"
          onClick={async () => {
            if (!confirm(user ? t.progress.clearConfirmAccount : t.progress.clearConfirm)) return;
            if (await clearAllResults()) setFilter(ALL);
          }}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 transition-colors hover:bg-raised hover:text-error"
        >
          <Trash2 size={14} /> {t.progress.clear}
        </button>
      </div>
    </div>
  );
}

function Tile({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div className="rounded-2xl bg-raised px-4 py-4">
      <dt className="text-xs text-sub">{label}</dt>
      <dd className={`mt-1.5 font-mono text-3xl font-semibold tabular-nums ${accent ? "text-main" : "text-text"}`}>{value}</dd>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-raised p-5 sm:p-6">
      <h2 className="mb-4 text-sm font-medium">{title}</h2>
      {children}
    </section>
  );
}

const subscribeNoop = () => () => {};

/** Offers to move results recorded while signed out into the signed-in account. */
function ImportBanner() {
  const { t } = useI18n();
  const user = useAuth((s) => s.user);
  // Re-read whenever any history changes (an import clears the signed-out list).
  const count = useSyncExternalStore(
    user ? subscribeHistory : subscribeNoop,
    () => (user ? readHistory(null).length : 0),
    () => 0,
  );
  const [state, setState] = useState<"idle" | "busy" | "dismissed" | "failed">("idle");

  if (!user || count === 0 || state === "dismissed") return null;
  return (
    <div className="fade-up flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-main/30 bg-main/10 px-5 py-4 text-left">
      <div className="flex items-start gap-3">
        <CloudUpload size={20} className="mt-0.5 shrink-0 text-main" />
        <div>
          <p className="text-sm font-medium text-text">{fmt(t.progress.importTitle, { n: count })}</p>
          <p className="mt-0.5 text-xs text-sub">{state === "failed" ? t.auth.error : t.progress.importBody}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setState("dismissed")}
          className="rounded-lg px-3 py-2 text-sm text-sub transition-colors hover:text-text"
        >
          {t.progress.dismiss}
        </button>
        <button
          type="button"
          disabled={state === "busy"}
          onClick={async () => {
            setState("busy");
            setState((await importAnonymous()) ? "idle" : "failed");
          }}
          className="rounded-xl bg-main px-4 py-2 text-sm font-medium text-bg transition hover:brightness-110 disabled:opacity-70"
        >
          {state === "busy" ? t.progress.importing : t.progress.importAction}
        </button>
      </div>
    </div>
  );
}