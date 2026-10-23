"use client";

import { create } from "zustand";

interface UiState {
  settingsOpen: boolean;
  authOpen: boolean;
  usernameOpen: boolean;
  setSettingsOpen: (v: boolean) => void;
  setAuthOpen: (v: boolean) => void;
  setUsernameOpen: (v: boolean) => void;
}

/** Transient UI state shared between the header, dialogs and the typing test. */
export const useUi = create<UiState>()((set) => ({
  settingsOpen: false,
  authOpen: false,
  usernameOpen: false,
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setAuthOpen: (authOpen) => set({ authOpen }),
  setUsernameOpen: (usernameOpen) => set({ usernameOpen }),
}));
