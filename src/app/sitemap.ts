import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

const PAGES = ["", "/leaderboard", "/privacy", "/cookies", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${page}`,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.5,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${page}`])) },
    })),
  );
}
