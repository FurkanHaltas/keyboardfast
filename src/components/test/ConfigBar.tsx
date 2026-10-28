"use client";

import { AtSign, CaseSensitive, Clock3, Code2, Crosshair, Globe, Hash, Terminal } from "lucide-react";
import { Menu } from "@/components/Menu";
import { CODE_LANGUAGE_NAMES, CODE_LANGUAGES } from "@/content/code";
import { WORD_LANGUAGE_NAMES, WORD_LANGUAGES } from "@/content/words";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveWordLang, type PracticeFocus } from "@/lib/createTest";
import { TIME_OPTIONS, useSettings, WORD_OPTIONS, type Settings, type TestMode } from "@/lib/settings";

export function ConfigBar({ onChange, hidden, focus }: { onChange: () => void; hidden: boolean; focus?: PracticeFocus }) {
  const { t, locale } = useI18n();
  const s = useSettings();
  const update = (patch: Partial<Settings>) => {
    s.set(patch);
    onChange();
  };

  const modes: { id: TestMode; label: string; icon: React.ReactNode }[] = [
    { id: "time", label: t.config.time, icon: <Clock3 size={15} /> },
    { id: "words", label: t.config.words, icon: <CaseSensitive size={17} /> },
    { id: "code", label: t.config.code, icon: <Code2 size={15} /> },
    { id: "practice", label: t.config.practice, icon: <Crosshair size={15} /> },
  ];

  return (
    <div
      className={`mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-xl bg-raised px-2 py-1.5 text-[0.8rem] transition-opacity duration-300 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden || undefined}
    >
      {(s.mode === "time" || s.mode === "words") && (
        <>
          <Pill active={s.punctuation} onClick={() => update({ punctuation: !s.punctuation })} aria-pressed={s.punctuation}>
            <AtSign size={14} /> {t.config.punctuation}
          </Pill>
          <Pill active={s.numbers} onClick={() => update({ numbers: !s.numbers })} aria-pressed={s.numbers}>
            <Hash size={14} /> {t.config.numbers}
          </Pill>
          <Divider />
        </>
      )}

      {modes.map((m) => (
        <Pill key={m.id} active={s.mode === m.id} onClick={() => update({ mode: m.id })} aria-pressed={s.mode === m.id}>
          {m.icon} {m.label}
        </Pill>
      ))}
      <Divider />

      {s.mode === "time" &&
        TIME_OPTIONS.map((v) => (
          <Pill key={v} active={s.time === v} onClick={() => update({ time: v })} aria-pressed={s.time === v}>
            {v}
          </Pill>
        ))}
      {s.mode === "words" &&
        WORD_OPTIONS.map((v) => (
          <Pill key={v} active={s.words === v} onClick={() => update({ words: v })} aria-pressed={s.words === v}>
            {v}
          </Pill>
        ))}

      {s.mode === "practice" && <FocusKeys focus={focus} label={t.test.practiceFocus} />}

      {s.mode === "code" ? (
        <Menu
          value={s.codeLang}
          options={CODE_LANGUAGES}
          label={(v) => CODE_LANGUAGE_NAMES[v]}
          onChange={(v) => update({ codeLang: v })}
          ariaLabel={t.config.codeLanguage}
          icon={<Terminal size={14} />}
        />
      ) : (
        <>
          <Divider />
          <Menu
            value={resolveWordLang(s, locale)}
            options={WORD_LANGUAGES}
            label={(v) => WORD_LANGUAGE_NAMES[v]}
            onChange={(v) => update({ wordLang: v })}
            ariaLabel={t.config.typingLanguage}
            icon={<Globe size={14} />}
          />
        </>
      )}
    </div>
  );
}

function Pill({ active, children, ...rest }: { active: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-colors ${
        active ? "text-main" : "text-sub hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

/** The weak letters and pairs the current practice text drills; a dash until there is data. */
function FocusKeys({ focus, label }: { focus?: PracticeFocus; label: string }) {
  const items = [...(focus?.keys ?? []), ...(focus?.bigrams ?? [])];
  return (
    <span className="flex items-center gap-1.5 px-2 text-sub">
      {label}
      {items.length ? (
        items.map((k) => (
          <kbd key={k} className="rounded-md bg-bg px-1.5 py-0.5 font-mono text-[0.75rem] text-main">
            {k}
          </kbd>
        ))
      ) : (
        <span aria-hidden>–</span>
      )}
    </span>
  );
}

function Divider() {
  return <span className="mx-1 h-4 w-px bg-line" aria-hidden />;
}
