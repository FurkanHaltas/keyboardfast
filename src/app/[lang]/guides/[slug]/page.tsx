import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/ArticlePage";
import { getGuide, GUIDE_SLUGS } from "@/content/guides";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/pageMetadata";
import { OWNER_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const g = isLocale(lang) ? getGuide(lang, slug) : undefined;
  if (!g) return {};
  return pageMetadata(lang, `/guides/${slug}`, { title: g.title, description: g.description });
}

export default async function Page({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const { lang, slug } = await params;
  const g = isLocale(lang) ? getGuide(lang, slug) : undefined;
  if (!isLocale(lang) || !g) notFound();
  // schema.org Article so search engines can show the guide as an article.
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    inLanguage: lang,
    author: { "@type": "Person", name: OWNER_NAME },
    publisher: { "@type": "Organization", name: "keyboardfast", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/${lang}/guides/${slug}`,
  }).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ArticlePage article={g} locale={lang} guide />
    </>
  );
}
