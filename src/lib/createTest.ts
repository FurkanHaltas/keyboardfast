import { pickSnippet } from "@/content/code";
import { getWordList, WORD_LANGUAGES, type WordLanguage } from "@/content/words";
import { TypingEngine } from "@/engine/engine";
import { codeToWords, createWordStream } from "@/engine/generate";
import type { Word } from "@/engine/types";
import type { Settings, TestMode } from "./settings";

export interface TestSetup {
  engine: TypingEngine;
  /** words the test started with, kept so "repeat" can replay the same text */
  words: Word[];
  /** the mode this test was built for; settings may already have moved on */
  mode: TestMode;
  mode2: string;
  punctuation: boolean;
  numbers: boolean;
  lang: WordLanguage | null;
  snippet?: string;
}

export function resolveWordLang(s: Pick<Settings, "wordLang">, uiLocale: string): WordLanguage {
  if (s.wordLang) return s.wordLang;
  return (WORD_LANGUAGES as string[]).includes(uiLocale) ? (uiLocale as WordLanguage) : "en";
}

export function createTest(s: Settings, uiLocale: string, prev?: TestSetup): TestSetup {
  if (s.mode === "code") {
    const snippet = pickSnippet(s.codeLang, prev?.snippet);
    const words = codeToWords(snippet);
    return {
      engine: new TypingEngine({ words, limit: { kind: "words" } }),
      words,
      mode: "code",
      mode2: s.codeLang,
      punctuation: false,
      numbers: false,
      lang: null,
      snippet,
    };
  }
  const base = { mode: s.mode, punctuation: s.punctuation, numbers: s.numbers };

  const lang = resolveWordLang(s, uiLocale);
  const stream = createWordStream(getWordList(lang), { locale: lang, punctuation: s.punctuation, numbers: s.numbers });
  if (s.mode === "time") {
    const words = stream(100);
    return {
      ...base,
      engine: new TypingEngine({ words, limit: { kind: "time", seconds: s.time }, more: () => stream(60) }),
      words,
      mode2: String(s.time),
      lang,
    };
  }
  const words = stream(s.words);
  return { ...base, engine: new TypingEngine({ words, limit: { kind: "words" } }), words, mode2: String(s.words), lang };
}

/** Same text again with a fresh engine. Time tests keep generating from where they left off. */
export function repeatTest(prev: TestSetup): TestSetup {
  const words = prev.words.map((w) => ({ ...w }));
  if (prev.mode === "time") {
    const lang = prev.lang ?? "en";
    const stream = createWordStream(getWordList(lang), { locale: lang, punctuation: prev.punctuation, numbers: prev.numbers });
    const limit = { kind: "time" as const, seconds: Number(prev.mode2) };
    return { ...prev, words, engine: new TypingEngine({ words, limit, more: () => stream(60) }) };
  }
  return { ...prev, words, engine: new TypingEngine({ words, limit: { kind: "words" } }) };
}
