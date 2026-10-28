import type { MetadataRoute } from "next";
import { CONTENT_LOCALES, GUIDE_SLUGS } from "@/content/guides";
import { LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

const PAGES = ["", "/leaderboard", "/privacy", "/cookies", "/terms"];

// Written in English and Turkish only; the other locales canonicalise to English.
const CONTENT = ["/about", "/guides", ...GUIDE_SLUGS.map((s) => `/guides/${s}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = (pages: string[], locales: readonly string[]) =>
    pages.flatMap((page) =>
      locales.map((lang) => ({
        url: `${SITE_URL}/${lang}${page}`,
        changeFrequency: "weekly" as const,
        priority: page === "" ? 1 : page.startsWith("/guides") ? 0.7 : 0.5,
        alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${page}`])) },
      })),
    );
  return [...entries(PAGES, LOCALES), ...entries(CONTENT, CONTENT_LOCALES)];
}
