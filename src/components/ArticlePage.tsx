import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import type { Article, Block } from "@/content/guides";
import { fmt, getDictionary, type Locale } from "@/i18n/config";

/** About page and guides: long-form text with a call to action back to the test. */
export async function ArticlePage({ article, locale, guide }: { article: Article; locale: Locale; guide?: boolean }) {
  const t = await getDictionary(locale);

  return (
    <article className="fade-up mx-auto w-full max-w-2xl pb-16">
      {guide && (
        <Link
          href={`/${locale}/guides`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-sub transition-colors hover:text-text"
        >
          <ArrowLeft size={15} /> {t.guides.allGuides}
        </Link>
      )}
      <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
      {guide && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-sub">
          <Clock size={14} /> {fmt(t.guides.readTime, { n: article.minutes })}
        </p>
      )}
      <p className="mt-6 text-lg leading-relaxed text-text/90">{article.description}</p>

      {article.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="mb-3 text-xl font-semibold">{s.heading}</h2>
          <div className="space-y-4">
            {s.body.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
        </section>
      ))}

      <aside className="mt-12 rounded-2xl bg-raised p-6">
        <h2 className="font-semibold">{t.guides.ctaTitle}</h2>
        <p className="mt-1 text-sm text-sub">{t.guides.ctaBody}</p>
        <Link
          href={`/${locale}`}
          className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-main px-5 py-2.5 text-sm font-medium text-bg transition hover:brightness-110"
        >
          {t.guides.ctaButton}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </aside>
    </article>
  );
}

function BlockView({ block }: { block: Block }) {
  if (typeof block === "string") return <p className="leading-relaxed text-text/85">{block}</p>;
  return (
    <ul className="space-y-2.5">
      {block.list.map((item) => (
        <li key={item} className="relative pl-5 leading-relaxed text-text/85">
          <span className="absolute top-[0.7em] left-1 size-1.5 rounded-full bg-main/70" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
