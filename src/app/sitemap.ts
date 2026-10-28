import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

const PAGES = ["", "/leaderboard"];
// Legal text exists only in English and Turkish; other locales canonicalise to English.
const LEGAL = ["/privacy", "/cookies", "/terms"];
const LEGAL_LOCALES = ["en", "tr"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = (pages: string[], locales: readonly string[]) =>
    pages.flatMap((page) =>
      locales.map((lang) => ({
        url: `${SITE_URL}/${lang}${page}`,
        changeFrequency: "weekly" as const,
        priority: page === "" ? 1 : 0.5,
        alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${page}`])) },
      })),
    );
  return [...entries(PAGES, LOCALES), ...entries(LEGAL, LEGAL_LOCALES)];
}
