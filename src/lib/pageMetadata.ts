import type { Metadata } from "next";
import { LOCALES } from "@/i18n/config";

type Options = {
  title?: string;
  description?: string;
  /** Keep the page out of search results (personal or locked pages). */
  noindex?: boolean;
  /** Locales that have their own content; others point their canonical at the first one. */
  locales?: readonly string[];
};

/**
 * Per-page canonical + hreflang. Without this every page inherits the layout's
 * canonical (the home page), which tells search engines the pages are duplicates.
 */
export function pageMetadata(
  lang: string,
  path: string,
  { title, description, noindex, locales = LOCALES }: Options = {},
): Metadata {
  const own = locales.includes(lang);
  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: {
      canonical: `/${own ? lang : locales[0]}${path}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    },
    ...(noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      ...(title && { title: `${title} · keyboardfast` }),
      ...(description && { description }),
      url: `/${lang}${path}`,
      siteName: "keyboardfast",
      locale: lang,
    },
  };
}
