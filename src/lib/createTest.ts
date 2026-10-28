import { pickSnippet, snippetAt } from "@/content/code";
import { getWordList, WORD_LANGUAGES, type WordLanguage } from "@/content/words";
import { TypingEngine } from "@/engine/engine";
import { codeToWords, createPracticeStream, createWordStream, mulberry32 } from "@/engine/generate";
import type { Word } from "@/engine/types";
import { PRACTICE_WORDS, type Settings, type TestMode } from "./settings";

/** Everything that defines a test's text. Shared with the server, which rebuilds tests to verify them. */
export interface TestConfig {
  mode: TestMode;
  /** "30" seconds, "25" words, or a code language id */
  mode2: string;
  lang: WordLanguage | null;
  punctuation: boolean;
  numbers: boolean;
  /** seeds the word generator; from a server ticket when the result should be verifiable */
  seed?: number;
  /** code mode: index of the snippet in its language */
  snippet?: number;
  /** practice mode: weak letters and slow letter pairs to drill */
  focus?: PracticeFocus;
}

export interface PracticeFocus {
  keys: string[];
  bigrams: string[];
}

export interface TestSetup extends TestConfig {
  engine: TypingEngine;
  /** words the test started with, kept so "repeat" can replay the same text */
  words: Word[];
  /** signed ticket that lets the server verify this test; absent for repeats and offline tests */
  ticket?: string;
}

export function resolveWordLang(s: Pick<Settings, "wordLang">, uiLocale: string): WordLanguage {
  if (s.wordLang) return s.wordLang;
  return (WORD_LANGUAGES as string[]).includes(uiLocale) ? (uiLocale as WordLanguage) : "en";
}

/** Builds the engine for a config. Deterministic when `seed` (or `snippet`) is set. Null for invalid configs. */
export function buildTest(cfg: TestConfig): Omit<TestSetup, "ticket"> | null {
  if (cfg.mode === "code") {
    const code = snippetAt(cfg.mode2, cfg.snippet ?? -1);
    if (code === undefined) return null;
    const words = codeToWords(code);
    return { ...cfg, engine: new TypingEngine({ words, limit: { kind: "words" } }), words };
  }
  if (!cfg.lang || !(WORD_LANGUAGES as string[]).includes(cfg.lang)) return null;
  const count = Number(cfg.mode2);
  if (!Number.isInteger(count) || count < 1 || count > 1000) return null;
  const rng = cfg.seed === undefined ? undefined : mulberry32(cfg.seed);
  if (cfg.mode === "practice") {
    const words = createPracticeStream(getWordList(cfg.lang), cfg.focus ?? { keys: [], bigrams: [] }, rng)(count);
    return { ...cfg, engine: new TypingEngine({ words, limit: { kind: "words" } }), words };
  }
  const stream = createWordStream(getWordList(cfg.lang), {
    locale: cfg.lang,
    punctuation: cfg.punctuation,
    numbers: cfg.numbers,
    rng,
  });
  if (cfg.mode === "time") {
    const words = stream(100);
    const limit = { kind: "time" as const, seconds: count };
    return { ...cfg, engine: new TypingEngine({ words, limit, more: () => stream(60) }), words };
  }
  const words = stream(count);
  return { ...cfg, engine: new TypingEngine({ words, limit: { kind: "words" } }), words };
}

export function createTest(
  s: Settings,
  uiLocale: string,
  prev?: TestSetup,
  seed?: number,
  focus?: PracticeFocus,
): TestSetup {
  const base = { punctuation: false, numbers: false, seed };
  const cfg: TestConfig =
    s.mode === "practice"
      ? { ...base, mode: "practice", mode2: String(PRACTICE_WORDS), lang: resolveWordLang(s, uiLocale), focus }
      : s.mode === "code"
      ? {
          ...base,
          mode: "code",
          mode2: s.codeLang,
          lang: null,
          snippet: pickSnippet(s.codeLang, prev?.mode2 === s.codeLang ? prev.snippet : undefined),
        }
      : {
          ...base,
          mode: s.mode,
          mode2: String(s.mode === "time" ? s.time : s.words),
          lang: resolveWordLang(s, uiLocale),
          punctuation: s.punctuation,
          numbers: s.numbers,
        };
  return buildTest(cfg)!;
}

/** Same text again with a fresh engine. Time tests keep generating from where they left off. Never verifiable. */
export function repeatTest(prev: TestSetup): TestSetup {
  const words = prev.words.map((w) => ({ ...w }));
  const rest = { ...prev, ticket: undefined };
  if (prev.mode === "time") {
    const lang = prev.lang ?? "en";
    const stream = createWordStream(getWordList(lang), { locale: lang, punctuation: prev.punctuation, numbers: prev.numbers });
    const limit = { kind: "time" as const, seconds: Number(prev.mode2) };
    return { ...rest, words, engine: new TypingEngine({ words, limit, more: () => stream(60) }) };
  }
  return { ...rest, words, engine: new TypingEngine({ words, limit: { kind: "words" } }) };
}
