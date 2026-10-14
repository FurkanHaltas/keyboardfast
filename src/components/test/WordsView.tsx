"use client";

import { memo, useLayoutEffect, useRef } from "react";
import type { TypingEngine } from "@/engine/engine";
import type { Word } from "@/engine/types";

interface Props {
  engine: TypingEngine;
  version: number;
  code: boolean;
  smoothCaret: boolean;
}

/** Number of visible lines and the line the active word is kept on. */
const LAYOUT = { text: { lines: 3, anchor: 1 }, code: { lines: 9, anchor: 3 } };

export function WordsView({ engine, version, code, smoothCaret }: Props) {
  const inner = useRef<HTMLDivElement>(null);
  const caret = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const wordEls = useRef<(HTMLSpanElement | null)[]>([]);
  const layout = code ? LAYOUT.code : LAYOUT.text;
  const { words, typed, index, status } = engine;

  // Position caret and scroll lines straight on the DOM: no React state, no extra renders.
  useLayoutEffect(() => {
    const wordEl = wordEls.current[index];
    const c = caret.current;
    if (!wordEl || !c || !inner.current || !viewport.current) return;
    const letters = wordEl.querySelectorAll<HTMLElement>("[data-l]");
    const n = typed[index]?.length ?? 0;
    let left: number;
    let top: number;
    let h: number;
    if (n < letters.length) {
      const el = letters[n];
      left = el.offsetLeft;
      top = el.offsetTop;
      h = el.offsetHeight;
    } else {
      const el = letters[letters.length - 1];
      left = el.offsetLeft + el.offsetWidth;
      top = el.offsetTop;
      h = el.offsetHeight;
    }
    c.style.height = `${h * 0.78}px`;
    c.style.transform = `translate3d(${left}px, ${top + h * 0.11}px, 0)`;

    const lineH = wordEl.offsetHeight;
    viewport.current.style.height = `${lineH * layout.lines}px`;
    const line = Math.round(wordEl.offsetTop / lineH);
    const shift = Math.max(0, line - layout.anchor) * lineH;
    inner.current.style.transform = `translate3d(0, ${-shift}px, 0)`;
  }, [version, index, typed, layout]);

  return (
    <div
      ref={viewport}
      className="relative overflow-hidden font-mono text-[1.45rem] leading-[1.75] sm:text-[1.6rem]"
      // Ligatures would merge "=>" or "!=" into one glyph; every typed character must stay visible.
      style={{ height: `${1.75 * layout.lines}em`, fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "calt" 0' }}
    >
      <div ref={inner} className="relative flex flex-wrap transition-transform duration-200 ease-out">
        {words.map((w, i) => (
          <WordView
            key={i}
            ref={(el) => {
              wordEls.current[i] = el;
            }}
            word={w}
            typed={i <= index ? typed[i] : ""}
            active={i === index}
            past={i < index}
            showSep={code}
          />
        ))}
        <div
          ref={caret}
          aria-hidden
          className={`pointer-events-none absolute top-0 left-0 w-[2.5px] rounded-full bg-main will-change-transform ${
            smoothCaret ? "transition-transform duration-[95ms] ease-out" : ""
          } ${status === "idle" ? "caret-idle" : ""}`}
        />
      </div>
    </div>
  );
}

interface WordProps {
  word: Word;
  typed: string;
  active: boolean;
  past: boolean;
  showSep: boolean;
  ref: React.Ref<HTMLSpanElement>;
}

const WordView = memo(function WordView({ word, typed, active, past, showSep, ref }: WordProps) {
  const { text, indent, sep } = word;
  const len = Math.max(text.length, typed.length);
  const hasError = past && typed !== text;
  const letters = [];
  for (let j = 0; j < len; j++) {
    let cls = "text-sub";
    let ch = text[j];
    if (j < typed.length) {
      if (j >= text.length) {
        cls = "text-error-extra";
        ch = typed[j];
      } else cls = typed[j] === text[j] ? "text-text" : "text-error";
    }
    letters.push(
      <span key={j} data-l className={`${cls} transition-colors duration-75`}>
        {ch}
      </span>,
    );
  }
  // A visible return glyph doubles as the caret anchor for the Enter key in code mode.
  if (showSep && sep === "\n") {
    const done = past || (active && typed.length > text.length);
    letters.push(
      <span key="sep" className={`text-[0.7em] ${done ? "text-sub/30" : "text-sub/50"}`} aria-hidden>
        ⏎
      </span>,
    );
  }

  return (
    <>
      <span
        ref={ref}
        className={`mr-[1ch] whitespace-pre decoration-error decoration-2 underline-offset-[6px] ${
          hasError ? "underline" : ""
        }`}
        data-active={active || undefined}
      >
        {indent && <span className="inline-block" style={{ width: `${indent.length}ch` }} />}
        {letters}
      </span>
      {sep === "\n" && showSep && <span className="basis-full" aria-hidden />}
    </>
  );
});
