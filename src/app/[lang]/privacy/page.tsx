import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { isLocale } from "@/i18n/config";
import { legalMetadata } from "@/lib/legalRoute";

export const generateMetadata = ({ params }: PageProps<"/[lang]/privacy">) => legalMetadata("privacy", params);

export default async function Page({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage kind="privacy" locale={lang} />;
}
