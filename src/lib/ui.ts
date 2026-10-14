"use client";

import { create } from "zustand";

/** Transient UI state shared between the header and the typing test. */
export const useUi = create<{ settingsOpen: boolean; setSettingsOpen: (v: boolean) => void }>()((set) => ({
  settingsOpen: false,
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
}));
