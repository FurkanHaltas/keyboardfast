import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuides } from "@/content/guides";
import { fmt, getDictionary, isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/guides">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "/guides", { title: t.guides.title, description: t.guides.subtitle });
}

export default async function Page({ params }: PageProps<"/[lang]/guides">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="fade-up mx-auto w-full max-w-2xl pb-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.guides.title}</h1>
      <p className="mt-2 text-sub">{t.guides.subtitle}</p>
      <ul className="mt-8 space-y-3">
        {getGuides(lang).map((g) => (
          <li key={g.slug}>
            <Link
              href={`/${lang}/guides/${g.slug}`}
              className="group block rounded-2xl bg-raised p-5 transition-colors hover:bg-raised/70 sm:p-6"
            >
              <h2 className="flex items-start justify-between gap-3 text-lg font-semibold">
                {g.title}
                <ArrowRight
                  size={18}
                  className="mt-1 shrink-0 text-sub transition group-hover:translate-x-0.5 group-hover:text-main"
                />
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-sub">{g.description}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-sub">
                <Clock size={13} /> {fmt(t.guides.readTime, { n: g.minutes })}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
