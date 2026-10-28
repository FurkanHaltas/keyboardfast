"use client";

import { MousePointerClick, RotateCcw, TriangleAlert } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useShallow } from "zustand/react/shallow";
import { summarizeKeys } from "@/engine/stats";
import type { TestResult } from "@/engine/types";
import { useI18n } from "@/i18n/I18nProvider";
import { createTest, repeatTest, resolveWordLang, type TestSetup } from "@/lib/createTest";
import { compare, getHistorySnapshot, isSavable, type Comparison, type HistoryEntry } from "@/lib/history";
import { modeLabel } from "@/lib/modeLabel";
import { useSettings, useSettingsReady } from "@/lib/settings";
import { saveResult, submitForVerification, useAuth } from "@/lib/sync";
import { onTicket, takeTicket } from "@/lib/tickets";
import { useUi } from "@/lib/ui";
import { analyzeWeakness } from "@/lib/weakness";
import { ConfigBar } from "./ConfigBar";
import { Results } from "./Results";
import { WordsView } from "./WordsView";

interface Outcome {
  result: TestResult;
  comparison: Comparison | null;
  saved: boolean;
}

const noopSubscribe = () => () => {};
const zero = () => 0;

export function TypingTest() {
  const { t, locale } = useI18n();
  const ready = useSettingsReady();
  const cfg = useSettings((s) => [s.mode, s.time, s.words, s.wordLang, s.codeLang, s.punctuation, s.numbers].join("|"));
  const { liveWpm, smoothCaret } = useSettings(useShallow((s) => ({ liveWpm: s.liveWpm, smoothCaret: s.smoothCaret })));
  // Any open dialog owns the keyboard.
  const settingsOpen = useUi((s) => s.settingsOpen || s.authOpen || s.usernameOpen);

  const [setup, setSetup] = useState<TestSetup | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [testId, setTestId] = useState(0);
  const [focused, setFocused] = useState(false);
  const [caps, setCaps] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const setupRef = useRef<TestSetup | null>(null);
  const savedFor = useRef<unknown>(null);
  /** set when a script (not a person) generated input during the current test */
  const untrusted = useRef(false);

  const engine = setup?.engine;
  const version = useSyncExternalStore(engine?.subscribe ?? noopSubscribe, engine?.getVersion ?? zero, zero);
  const status = engine?.status ?? "idle";

  const focusInput = useCallback(() => {
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }, []);

  const start = useCallback(
    (kind: "new" | "repeat" = "new") => {
      const s = useSettings.getState();
      const prev = setupRef.current;
      let next: TestSetup;
      if (kind === "repeat" && prev) next = repeatTest(prev);
      else {
        // Signed-in users get a server-issued seed so the result can be verified for the leaderboard.
        // Practice text is personal, so it is never verified or ranked.
        const ticket = useAuth.getState().user && s.mode !== "practice" ? takeTicket() : null;
        const focus = s.mode === "practice" ? practiceFocus(resolveWordLang(s, locale)) : undefined;
        next = createTest(s, locale, prev ?? undefined, ticket?.seed, focus);
        if (ticket) next.ticket = ticket.ticket;
      }
      setupRef.current = next;
      setSetup(next);
      setOutcome(null);
      untrusted.current = false;
      setTestId((n) => n + 1);
      focusInput();
    },
    [locale, focusInput],
  );

  // A new test whenever the configuration (or the language it follows) changes.
  useEffect(() => {
    if (ready) start();
  }, [ready, cfg, start]);

  // A ticket arrived (first visit, or the previous one was used): if the user hasn't started
  // typing yet, rebuild the test from it so this one counts for the leaderboard too.
  useEffect(
    () =>
      onTicket(() => {
        const cur = setupRef.current;
        if (cur && !cur.ticket && cur.mode !== "practice" && cur.engine.status === "idle" && useAuth.getState().user) start();
      }),
    [start],
  );

  // Drive the clock and per-second samples while running.
  useEffect(() => {
    if (!engine || status !== "running") return;
    let raf = 0;
    const loop = () => {
      engine.tick(performance.now());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [engine, status]);

  // Fade surrounding chrome while typing for focus.
  useEffect(() => {
    document.body.dataset.typing = status === "running" ? "true" : "false";
    return () => {
      document.body.dataset.typing = "false";
    };
  }, [status]);

  // Persist and compare once per finished test.
  useEffect(() => {
    if (!engine || !setup || status !== "finished" || !engine.result || savedFor.current === engine) return;
    savedFor.current = engine;
    const r = engine.result;
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      mode: setup.mode,
      mode2: setup.mode2,
      lang: setup.lang,
      punctuation: setup.punctuation,
      numbers: setup.numbers,
      wpm: r.wpm,
      raw: r.raw,
      acc: r.accuracy,
      consistency: r.consistency,
      durationMs: r.durationMs,
      chars: r.chars,
      keys: summarizeKeys(r),
    };
    const saved = isSavable(r.durationMs, r.wpm);
    let comparison: Comparison | null = null;
    if (saved) {
      comparison = compare(getHistorySnapshot(), entry);
      saveResult(entry);
      if (!untrusted.current) void submitForVerification(entry, setup);
    }
    setOutcome({ result: r, comparison, saved });
  }, [engine, setup, status, version]);

  // Global shortcuts: Tab restarts, Esc releases focus, typing anywhere refocuses the test.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (settingsOpen) return;
      const inTest = document.activeElement === inputRef.current;
      if (e.key === "Tab" && (inTest || outcome)) {
        e.preventDefault();
        start();
        return;
      }
      if (e.key === "Escape" && inTest) {
        inputRef.current?.blur();
        return;
      }
      const onBody = document.activeElement === document.body || document.activeElement === null;
      if (!inTest && !outcome && onBody && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        inputRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen, outcome, start]);

  const feed = (el: HTMLInputElement) => {
    const v = el.value;
    el.value = "";
    if (!engine) return;
    for (const ch of v) engine.input(ch, performance.now());
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isTrusted) untrusted.current = true;
    setCaps(e.getModifierState?.("CapsLock") ?? false);
    if (!engine) return;
    if (e.key === "Backspace") {
      e.preventDefault();
      engine.backspace(e.ctrlKey || e.altKey || e.metaKey, performance.now());
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (setup?.mode === "code") engine.input("\n", performance.now());
    }
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const ev = e.nativeEvent as InputEvent;
    if (!ev.isTrusted) untrusted.current = true;
    if (ev.isComposing) return;
    if (ev.inputType === "deleteContentBackward") {
      // Mobile keyboards often skip keydown for Backspace.
      e.currentTarget.value = "";
      engine?.backspace(false, performance.now());
      return;
    }
    feed(e.currentTarget);
  };

  if (!ready || !setup || !engine) return <div className="flex-1" aria-busy />;

  const { mode } = setup;
  const label = modeLabel(setup, t);

  if (outcome) {
    return (
      <div className="flex flex-1 flex-col justify-center pb-10">
        <Results
          result={outcome.result}
          comparison={outcome.comparison}
          saved={outcome.saved}
          modeLabel={label}
          lang={setup.lang}
          onNext={() => start()}
          onRepeat={() => start("repeat")}
        />
      </div>
    );
  }

  const running = status === "running";
  const elapsedSec = engine.samples.length;
  const counter =
    mode === "time" ? Math.max(0, Number(setup.mode2) - elapsedSec) : `${engine.index}/${engine.words.length}`;
  const live = engine.samples.at(-1)?.wpm ?? 0;

  return (
    <div className="flex flex-1 flex-col justify-center gap-10 pb-16">
      <ConfigBar onChange={focusInput} hidden={running} focus={setup.mode === "practice" ? setup.focus : undefined} />

      <div className="relative">
        <div className="mb-3 flex h-8 items-end justify-between font-mono text-2xl">
          <div className={`flex items-baseline gap-5 transition-opacity duration-300 ${running ? "opacity-100" : "opacity-0"}`}>
            <span className="text-main tabular-nums">{counter}</span>
            {liveWpm && <span className="text-lg text-sub tabular-nums">{live}</span>}
          </div>
          {caps && focused && (
            <span className="fade-up flex items-center gap-1.5 rounded-lg bg-main px-2.5 py-1 font-sans text-xs font-medium text-bg">
              <TriangleAlert size={13} /> {t.test.capsLock}
            </span>
          )}
        </div>

        <div key={testId} className="fade-up">
          <div className={`transition-[filter,opacity] duration-300 ${focused ? "" : "opacity-40 blur-[3px]"}`}>
            <WordsView engine={engine} version={version} code={mode === "code"} smoothCaret={smoothCaret} />
          </div>
        </div>

        {!focused && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="fade-up flex items-center gap-2 text-sm text-text">
              <MousePointerClick size={17} className="text-main" />
              {t.test.focus}
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          aria-label={t.test.focus}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="absolute inset-0 h-full w-full cursor-default resize-none opacity-0"
          style={{ fontSize: 16, caretColor: "transparent" }}
          onKeyDown={onKeyDown}
          onInput={onInput}
          onCompositionEnd={(e) => feed(e.currentTarget)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      <div className={`flex flex-col items-center gap-3 transition-opacity duration-300 ${running ? "opacity-0" : "opacity-100"}`}>
        <button
          type="button"
          onClick={() => start()}
          aria-label={t.test.restart}
          title={t.test.restart}
          className="rounded-xl p-3 text-sub transition-colors hover:bg-raised hover:text-text"
        >
          <RotateCcw size={20} />
        </button>
        {mode === "code" && <p className="text-xs text-sub">{t.test.autoIndent}</p>}
        {mode === "practice" && !setup.focus?.keys.length && !setup.focus?.bigrams.length && (
          <p className="max-w-md text-center text-xs text-sub">{t.test.practiceNoData}</p>
        )}
      </div>
    </div>
  );
}

/** Weak letters and slow pairs for practice text, from this device's/account's recent tests. */
function practiceFocus(lang: string) {
  const w = analyzeWeakness(getHistorySnapshot(), lang);
  return { keys: w.weakKeys, bigrams: w.slowBigrams };
}
