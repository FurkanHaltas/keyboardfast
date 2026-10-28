import { CODE_LANGUAGE_NAMES, type CodeLanguage } from "@/content/code";
import { WORD_LANGUAGE_NAMES, type WordLanguage } from "@/content/words";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { HistoryEntry } from "./history";

type ModeInfo = Pick<HistoryEntry, "mode" | "mode2" | "lang" | "punctuation" | "numbers">;

export function modeLabel(e: ModeInfo, t: Dictionary) {
  if (e.mode === "code") return `${t.config.code} · ${CODE_LANGUAGE_NAMES[e.mode2 as CodeLanguage] ?? e.mode2}`;
  const parts = [e.mode === "practice" ? t.config.practice : `${t.config[e.mode]} ${e.mode2}`];
  if (e.lang) parts.push(WORD_LANGUAGE_NAMES[e.lang as WordLanguage] ?? e.lang);
  const extras = `${e.punctuation ? "@" : ""}${e.numbers ? "#" : ""}`;
  if (extras) parts.push(extras);
  return parts.join(" · ");
}
