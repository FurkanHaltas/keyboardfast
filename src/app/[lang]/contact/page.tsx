import { ArrowRight, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactEmail } from "@/components/ContactEmail";
import { fmt, getDictionary, isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/pageMetadata";
import { OWNER_NAME } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "/contact", { title: t.contact.title, description: t.contact.description });
}

export default async function Page({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const c = t.contact;

  return (
    <div className="fade-up mx-auto w-full max-w-2xl pb-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{c.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-text/90">{c.description}</p>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-raised p-5 sm:flex-row sm:items-start sm:p-6">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-main/15 text-main">
          <Mail size={20} />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-sub">{c.emailLabel}</p>
          {/* Assembled in the browser so the address never appears in the server HTML. */}
          <ContactEmail className="mt-0.5 block font-mono text-lg break-words text-main transition hover:brightness-110 sm:text-xl" />
          <p className="mt-2 text-sm text-sub">{c.response}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">{c.topicsTitle}</h2>
        <ul className="space-y-2.5">
          {c.topics.map((item) => (
            <li key={item} className="relative pl-5 leading-relaxed text-text/85">
              <span className="absolute top-[0.7em] left-1 size-1.5 rounded-full bg-main/70" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">{c.bugTitle}</h2>
        <p className="leading-relaxed text-text/85">{c.bugBody}</p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">{c.moreTitle}</h2>
        <div className="space-y-2">
          {[
            { href: `/${lang}/guides`, label: c.guidesLink },
            { href: `/${lang}/privacy`, label: c.privacyLink },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between gap-3 rounded-xl bg-raised px-4 py-3 text-sm transition-colors hover:bg-raised/70"
            >
              {l.label}
              <ArrowRight size={16} className="shrink-0 text-sub transition group-hover:translate-x-0.5 group-hover:text-main" />
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-sub">{fmt(c.operator, { name: OWNER_NAME })}</p>
    </div>
  );
}
