"use client";

import { useEffect } from "react";
import { useSettings } from "@/lib/settings";
import { startAuth } from "@/lib/sync";

/** Loads saved settings and the auth session after hydration; keeps the document theme in sync. */
export function SettingsBoot() {
  const theme = useSettings((s) => s.theme);

  useEffect(() => {
    void useSettings.persist.rehydrate();
    startAuth();
  }, []);

  useEffect(() => {
    if (!useSettings.persist.hasHydrated()) return;
    document.documentElement.dataset.theme = theme;
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg);
  }, [theme]);

  return null;
}
