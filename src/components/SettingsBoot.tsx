"use client";

import { useEffect } from "react";
import { useSettings } from "@/lib/settings";

/** Loads saved settings after hydration and keeps the document theme in sync. */
export function SettingsBoot() {
  const theme = useSettings((s) => s.theme);

  useEffect(() => {
    void useSettings.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!useSettings.persist.hasHydrated()) return;
    document.documentElement.dataset.theme = theme;
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg);
  }, [theme]);

  return null;
}
