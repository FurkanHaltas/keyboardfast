"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CodeLanguage } from "@/content/code";
import type { WordLanguage } from "@/content/words";
import { SETTINGS_KEY } from "./storageKeys";

export type TestMode = "time" | "words" | "code";
export const TIME_OPTIONS = [15, 30, 60, 120] as const;
export const WORD_OPTIONS = [10, 25, 50, 100] as const;

export const THEMES = ["night", "paper", "ocean", "forest", "ember", "mist"] as const;
export type Theme = (typeof THEMES)[number];

export interface Settings {
  mode: TestMode;
  time: (typeof TIME_OPTIONS)[number];
  words: (typeof WORD_OPTIONS)[number];
  /** null = follow the interface language */
  wordLang: WordLanguage | null;
  codeLang: CodeLanguage;
  punctuation: boolean;
  numbers: boolean;
  theme: Theme;
  liveWpm: boolean;
  smoothCaret: boolean;
}

interface SettingsStore extends Settings {
  set: (patch: Partial<Settings>) => void;
}

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      mode: "time",
      time: 30,
      words: 25,
      wordLang: null,
      codeLang: "javascript",
      punctuation: false,
      numbers: false,
      theme: "night",
      liveWpm: true,
      smoothCaret: true,
      set: (patch) => set(patch),
    }),
    {
      name: SETTINGS_KEY,
      // Rehydrated manually after mount so server and client render the same markup.
      skipHydration: true,
      partialize: (s) => {
        const { set, ...rest } = s;
        void set;
        return rest;
      },
    },
  ),
);

const subscribeHydration = (cb: () => void) => useSettings.persist.onFinishHydration(cb);

/** True once saved settings have been loaded from storage (always false on the server). */
export function useSettingsReady() {
  return useSyncExternalStore(subscribeHydration, () => useSettings.persist.hasHydrated(), () => false);
}
