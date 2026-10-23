import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { isLocale } from "@/i18n/config";
import { legalMetadata } from "@/lib/legalRoute";

export const generateMetadata = ({ params }: PageProps<"/[lang]/terms">) => legalMetadata("terms", params);

export default async function Page({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage kind="terms" locale={lang} />;
}
