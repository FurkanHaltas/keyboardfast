import { Languages } from "lucide-react";
import { getLegalDoc, type LegalKind } from "@/content/legal";
import { fmt, getDictionary, type Locale } from "@/i18n/config";
import { CONTACT_EMAIL, LEGAL_UPDATED, OWNER_NAME } from "@/lib/site";

const SITE = "keyboardfast.com";

/** Fills {owner}/{site} and turns {email} into a mailto link. */
function Text({ value }: { value: string }) {
  const parts = value.replaceAll("{owner}", OWNER_NAME).replaceAll("{site}", SITE).split("{email}");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-main underline-offset-2 hover:underline">
              {CONTACT_EMAIL}
            </a>
          )}
        </span>
      ))}
    </>
  );
}

export async function LegalPage({ kind, locale }: { kind: LegalKind; locale: Locale }) {
  const t = await getDictionary(locale);
  const { doc, fallback } = getLegalDoc(kind, locale);
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(LEGAL_UPDATED));

  return (
    <article className="fade-up mx-auto w-full max-w-2xl pb-16" lang={fallback ? "en" : locale}>
      {fallback && (
        <p className="mb-6 flex items-center gap-2 rounded-xl bg-raised px-4 py-3 text-sm text-sub" lang={locale}>
          <Languages size={16} className="shrink-0 text-main" /> {t.legal.englishOnly}
        </p>
      )}
      <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
      <p className="mt-2 text-sm text-sub" lang={locale}>
        {fmt(t.legal.updated, { date: updated })}
      </p>
      <p className="mt-6 leading-relaxed text-text/90">
        <Text value={doc.intro} />
      </p>

      {doc.sections.map((s) => (
        <section key={s.heading} className="mt-9">
          <h2 className="mb-3 text-lg font-semibold">{s.heading}</h2>
          {s.body.length > 1 ? (
            <ul className="space-y-2.5">
              {s.body.map((b) => (
                <li key={b} className="relative pl-5 leading-relaxed text-text/85">
                  <span className="absolute top-[0.7em] left-1 size-1.5 rounded-full bg-main/70" aria-hidden />
                  <Text value={b} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="leading-relaxed text-text/85">
              <Text value={s.body[0]} />
            </p>
          )}
        </section>
      ))}
    </article>
  );
}
