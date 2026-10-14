import type { Metadata } from "next";
import { ProgressView } from "@/components/progress/ProgressView";
import { getDictionary, isLocale } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/progress">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: t.progress.title };
}

export default function ProgressPage() {
  return <ProgressView />;
}
