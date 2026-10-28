import type { Metadata } from "next";
import { ProgressView } from "@/components/progress/ProgressView";
import { getDictionary, isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/progress">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  // Personal and locked for guests, so there is nothing useful to show from search.
  return pageMetadata(lang, "/progress", { title: t.progress.title, noindex: true });
}

export default function ProgressPage() {
  return <ProgressView />;
}
