import type { Dictionary } from "./dictionaries/en";

export const LOCALES = ["en", "tr", "de", "es", "fr", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  pt: "Português",
};

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./dictionaries/en"),
  tr: () => import("./dictionaries/tr"),
  de: () => import("./dictionaries/de"),
  es: () => import("./dictionaries/es"),
  fr: () => import("./dictionaries/fr"),
  pt: () => import("./dictionaries/pt"),
};

export const getDictionary = async (locale: Locale) => (await loaders[locale]()).default;

/** Picks the best supported locale from an Accept-Language header. */
export function matchLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const hit = ranked.find((r) => isLocale(r.base));
  return hit ? (hit.base as Locale) : DEFAULT_LOCALE;
}

/** Persists an explicit language choice so the root redirect respects it. */
export function rememberLocale(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** Replaces `{name}` placeholders. */
export const fmt = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
