"use client";

import { CaseSensitive, Clock3, Code2, Crown, Globe, LogIn, Terminal, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Menu } from "@/components/Menu";
import { CODE_LANGUAGE_NAMES, CODE_LANGUAGES, type CodeLanguage } from "@/content/code";
import { WORD_LANGUAGE_NAMES, WORD_LANGUAGES, type WordLanguage } from "@/content/words";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveWordLang } from "@/lib/createTest";
import { TIME_OPTIONS, useSettings, WORD_OPTIONS, type TestMode } from "@/lib/settings";
import { fetchLeaderboard, useAuth, type LeaderboardPeriod, type LeaderboardRow } from "@/lib/sync";
import { useUi } from "@/lib/ui";

interface Category {
  mode: TestMode;
  mode2: string;
  lang: WordLanguage;
}

const MEDAL = ["text-[#f5c542]", "text-[#c0c7d1]", "text-[#d8925a]"];

export function LeaderboardView() {
  const { t, locale } = useI18n();
  const user = useAuth((s) => s.user);
  const profile = useAuth((s) => s.profile);
  const openAuth = useUi((s) => s.setAuthOpen);
  const openUsername = useUi((s) => s.setUsernameOpen);

  // Start from the category the visitor last typed in.
  const [cat, setCat] = useState<Category>(() => {
    const s = useSettings.getState();
    if (s.mode === "code") return { mode: "code", mode2: s.codeLang, lang: resolveWordLang(s, locale) };
    // Practice isn't ranked; fall back to the default timed board.
    if (s.mode === "practice") return { mode: "time", mode2: "30", lang: resolveWordLang(s, locale) };
    return { mode: s.mode, mode2: String(s.mode === "time" ? s.time : s.words), lang: resolveWordLang(s, locale) };
  });
  const [period, setPeriod] = useState<LeaderboardPeriod>("all");
  const [rows, setRows] = useState<LeaderboardRow[] | null | "error">(null);

  const key = `${cat.mode}|${cat.mode2}|${cat.lang}|${period}|${user?.id ?? ""}`;
  const [loadedKey, setLoadedKey] = useState("");

  useEffect(() => {
    let live = true;
    void fetchLeaderboard(cat.mode, cat.mode2, cat.mode === "code" ? null : cat.lang, period).then((r) => {
      if (!live) return;
      setRows(r ?? "error");
      setLoadedKey(key);
    });
    return () => {
      live = false;
    };
  }, [cat, period, key]);

  const loading = loadedKey !== key;

  const setMode = (mode: TestMode) =>
    setCat((c) => ({
      ...c,
      mode,
      mode2: mode === "time" ? "30" : mode === "words" ? "25" : (useSettings.getState().codeLang as string),
    }));

  const modes: { id: TestMode; label: string; icon: React.ReactNode }[] = [
    { id: "time", label: t.config.time, icon: <Clock3 size={15} /> },
    { id: "words", label: t.config.words, icon: <CaseSensitive size={17} /> },
    { id: "code", label: t.config.code, icon: <Code2 size={15} /> },
  ];
  const options = cat.mode === "time" ? TIME_OPTIONS : cat.mode === "words" ? WORD_OPTIONS : null;
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <div className="fade-up space-y-8 pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-3xl font-semibold tracking-tight">
            <Crown size={26} className="text-main" /> {t.leaderboard.title}
          </h1>
          <p className="mt-1 text-sm text-sub">{t.leaderboard.subtitle}</p>
        </div>
        <div className="flex rounded-xl bg-raised p-1 text-[0.8rem]" role="group" aria-label={t.leaderboard.period}>
          {(["week", "month", "all"] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={period === p}
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                period === p ? "bg-bg text-main" : "text-sub hover:text-text"
              }`}
            >
              {t.leaderboard.periods[p]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-1 gap-y-1 rounded-xl bg-raised px-2 py-1.5 text-[0.8rem]">
        {modes.map((m) => (
          <Pill key={m.id} active={cat.mode === m.id} onClick={() => setMode(m.id)}>
            {m.icon} {m.label}
          </Pill>
        ))}
        <span className="mx-1 h-4 w-px bg-line" aria-hidden />
        {options?.map((v) => (
          <Pill key={v} active={cat.mode2 === String(v)} onClick={() => setCat((c) => ({ ...c, mode2: String(v) }))}>
            {v}
          </Pill>
        ))}
        {cat.mode === "code" ? (
          <Menu
            value={cat.mode2 as CodeLanguage}
            options={CODE_LANGUAGES}
            label={(v) => CODE_LANGUAGE_NAMES[v]}
            onChange={(v) => setCat((c) => ({ ...c, mode2: v }))}
            ariaLabel={t.config.codeLanguage}
            icon={<Terminal size={14} />}
          />
        ) : (
          <>
            <span className="mx-1 h-4 w-px bg-line" aria-hidden />
            <Menu
              value={cat.lang}
              options={WORD_LANGUAGES}
              label={(v) => WORD_LANGUAGE_NAMES[v]}
              onChange={(v) => setCat((c) => ({ ...c, lang: v }))}
              ariaLabel={t.config.typingLanguage}
              icon={<Globe size={14} />}
            />
          </>
        )}
      </div>

      {!user ? (
        <Cta icon={<LogIn size={16} />} text={t.leaderboard.signInToJoin} action={t.auth.signIn} onClick={() => openAuth(true)} />
      ) : profile === null ? (
        <Cta
          icon={<UserPen size={16} />}
          text={t.leaderboard.pickUsername}
          action={t.leaderboard.chooseUsername}
          onClick={() => openUsername(true)}
        />
      ) : null}

      <div className="overflow-x-auto rounded-2xl bg-raised">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="text-left text-xs text-sub">
              <th className="w-14 px-5 py-3 font-normal">{t.leaderboard.rank}</th>
              <th className="px-3 py-3 font-normal">{t.leaderboard.player}</th>
              <th className="px-3 py-3 text-right font-normal">{t.results.wpm}</th>
              <th className="px-3 py-3 text-right font-normal">{t.results.acc}</th>
              <th className="hidden px-3 py-3 text-right font-normal sm:table-cell">{t.results.raw}</th>
              <th className="hidden px-3 py-3 text-right font-normal sm:table-cell">{t.results.consistency}</th>
              <th className="px-5 py-3 text-right font-normal">{t.leaderboard.date}</th>
            </tr>
          </thead>
          <tbody className={`font-mono tabular-nums transition-opacity ${loading ? "opacity-40" : ""}`}>
            {rows === "error" ? (
              <EmptyRow text={t.leaderboard.error} />
            ) : rows === null ? (
              Array.from({ length: 6 }, (_, i) => (
                <tr key={i} className="border-t border-line">
                  <td colSpan={7} className="px-5 py-3">
                    <div className="h-4 animate-pulse rounded bg-line/60" />
                  </td>
                </tr>
              ))
            ) : rows.length === 0 ? (
              <EmptyRow text={t.leaderboard.empty} />
            ) : (
              rows.map((r) => (
                <tr key={`${r.rank}-${r.username}`} className={`border-t border-line ${r.is_me ? "bg-main/10" : ""}`}>
                  <td className={`px-5 py-2.5 ${MEDAL[r.rank - 1] ?? "text-sub"}`}>
                    {r.rank <= 3 ? <Crown size={15} aria-label={String(r.rank)} /> : r.rank}
                  </td>
                  <td className="px-3 py-2.5 font-sans">
                    {r.username}
                    {r.is_me && (
                      <span className="ml-2 rounded-md bg-main px-1.5 py-0.5 text-[0.65rem] font-medium text-bg">
                        {t.leaderboard.you}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right text-main">{r.wpm.toFixed(1)}</td>
                  <td className="px-3 py-2.5 text-right">{Math.round(r.acc)}%</td>
                  <td className="hidden px-3 py-2.5 text-right text-sub sm:table-cell">{Math.round(r.raw)}</td>
                  <td className="hidden px-3 py-2.5 text-right text-sub sm:table-cell">{Math.round(r.consistency)}%</td>
                  <td className="px-5 py-2.5 text-right font-sans text-sub">{dateFmt.format(new Date(r.created_at))}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-sub">{t.leaderboard.plainOnly}</p>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <tr className="border-t border-line">
      <td colSpan={7} className="px-5 py-10 text-center font-sans text-sub">
        {text}
      </td>
    </tr>
  );
}

function Cta({ icon, text, action, onClick }: { icon: React.ReactNode; text: string; action: string; onClick: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-main/30 bg-main/10 px-5 py-3.5">
      <p className="flex items-center gap-2.5 text-sm text-text">
        <span className="text-main">{icon}</span> {text}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="rounded-xl bg-main px-4 py-2 text-sm font-medium text-bg transition hover:brightness-110"
      >
        {action}
      </button>
    </div>
  );
}

function Pill({ active, children, ...rest }: { active: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      {...rest}
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-colors ${
        active ? "text-main" : "text-sub hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}
