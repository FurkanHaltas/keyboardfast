import type { Locale } from "@/i18n/config";

/** Full main block of the usual layout for each interface language: number row, top, home, bottom. */
const LAYOUTS: Record<Locale, string[]> = {
  en: ["1234567890-=", "qwertyuiop[]", "asdfghjkl;'", "zxcvbnm,./"],
  tr: ["1234567890*-", "qwertyuıopğü", "asdfghjklşi,", "zxcvbnmöç."],
  de: ["1234567890ß´", "qwertzuiopü+", "asdfghjklöä#", "yxcvbnm,.-"],
  es: ["1234567890'¡", "qwertyuiop`+", "asdfghjklñ´ç", "zxcvbnm,.-"],
  fr: ["&é\"'(-è_çà)=", "azertyuiop^$", "qsdfghjklmù*", "wxcvbn,;:!"],
  pt: ["1234567890-=", "qwertyuiop´[", "asdfghjklç~]", "zxcvbnm,.;/"],
};

type Finger = "pinky" | "ring" | "middle" | "index" | "thumb";

/** Every row starts under the left little finger, so the column alone decides the finger. */
const COLUMN_FINGER: Finger[] = ["pinky", "ring", "middle", "index", "index", "index", "index", "middle", "ring"];
const fingerAt = (col: number): Finger => COLUMN_FINGER[col] ?? "pinky";

const HUE: Record<Finger, number | null> = { pinky: 305, ring: 245, middle: 155, index: 70, thumb: null };

// Tinted towards the theme background so the colours sit right in every theme, light or dark.
const tint = (f: Finger, amount: number) => {
  const hue = HUE[f];
  const color = hue === null ? "var(--sub)" : `oklch(0.72 0.15 ${hue})`;
  return `color-mix(in oklab, ${color} ${amount}%, var(--bg))`;
};

/** Stagger of each row in key widths, as on a real keyboard. */
const OFFSETS = [0, 0.5, 0.75, 1.25];

export interface FingerLabels {
  aria: string;
  caption: string;
  pinky: string;
  ring: string;
  middle: string;
  index: string;
  thumb: string;
}

/** Colour-coded keyboard showing which finger presses each key, in the reader's own layout. */
export function FingerMap({ locale, labels }: { locale: Locale; labels: FingerLabels }) {
  const rows = LAYOUTS[locale];
  return (
    <figure className="my-2 rounded-2xl bg-raised p-4 sm:p-6">
      <div
        role="img"
        aria-label={labels.aria}
        // One key plus its gap; 14 units fit the widest row with its stagger on any screen.
        style={{ "--u": "min(2.75rem, calc((100vw - 4.5rem) / 14))" } as React.CSSProperties}
        className="mx-auto flex w-fit flex-col gap-[3px]"
      >
        {rows.map((row, r) => (
          <div key={row} className="flex gap-[3px]" style={{ paddingLeft: `calc(var(--u) * ${OFFSETS[r]})` }}>
            {[...row].map((k, c) => {
              const f = fingerAt(c);
              const home = r === 2 && (c === 3 || c === 6);
              return (
                <span
                  key={c}
                  aria-hidden
                  className="relative flex aspect-square w-[calc(var(--u)-3px)] items-center justify-center rounded-md font-mono text-[0.7rem] text-text sm:text-sm"
                  style={{ background: tint(f, 38), boxShadow: `inset 0 0 0 1px ${tint(f, 65)}` }}
                >
                  {/* Letter keys show capitals like real keycaps; the number row keeps its symbols (é on AZERTY). */}
                  {r === 0 ? k : k.toLocaleUpperCase(locale)}
                  {home && <span className="absolute bottom-[18%] h-0.5 w-[28%] rounded-full bg-text/60" />}
                </span>
              );
            })}
          </div>
        ))}
        <div className="flex" style={{ paddingLeft: "calc(var(--u) * 3.5)" }}>
          <span
            aria-hidden
            className="h-[calc(var(--u)-3px)] w-[calc(var(--u)*6-3px)] rounded-md"
            style={{ background: tint("thumb", 38), boxShadow: `inset 0 0 0 1px ${tint("thumb", 65)}` }}
          />
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-sub">
        {(["pinky", "ring", "middle", "index", "thumb"] as const).map((f) => (
          <li key={f} className="flex items-center gap-1.5">
            <span className="size-3 rounded-sm" style={{ background: tint(f, 75) }} aria-hidden />
            {labels[f]}
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-center text-sm text-sub">{labels.caption}</figcaption>
    </figure>
  );
}
