import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/ArticlePage";
import { getAbout } from "@/content/guides";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const a = getAbout(lang);
  return pageMetadata(lang, "/about", { title: a.title, description: a.description });
}

export default async function Page({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <ArticlePage article={getAbout(lang)} locale={lang} />;
}
