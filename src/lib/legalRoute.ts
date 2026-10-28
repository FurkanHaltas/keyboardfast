import type { Metadata } from "next";
import { getLegalDoc, type LegalKind } from "@/content/legal";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "./pageMetadata";

/** Shared metadata for the privacy, cookies and terms pages. Only EN and TR have their own text; the rest point to EN. */
export async function legalMetadata(kind: LegalKind, params: Promise<{ lang: string }>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { doc } = getLegalDoc(kind, lang);
  return pageMetadata(lang, `/${kind}`, {
    title: doc.title,
    description: doc.intro.replace("{site}", "keyboardfast.com"),
    locales: ["en", "tr"],
  });
}
