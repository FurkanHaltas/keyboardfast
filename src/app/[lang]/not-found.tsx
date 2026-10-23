"use client";

import { StatusPage } from "@/components/StatusPage";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t } = useI18n();
  return <StatusPage code="404" title={t.notFound.title} body={t.notFound.body} />;
}
