import { describe, expect, it } from "vitest";
import { KEYBOARD_ROWS } from "./keyboards";
import { getWordList, WORD_LANGUAGE_NAMES, WORD_LANGUAGES } from "./words";

describe("word pools", () => {
  it.each(WORD_LANGUAGES)("%s has enough plain words", (lang) => {
    const words = getWordList(lang);
    expect(words.length).toBeGreaterThanOrEqual(170);
    // Letters only: hyphens and apostrophes would trip people up on most layouts.
    expect(words.filter((w) => !/^\p{L}+$/u.test(w))).toEqual([]);
    // German capitalises nouns; everyone else is lowercase so punctuation mode can capitalise.
    if (lang !== "de") expect(words.filter((w) => w !== w.toLocaleLowerCase(lang))).toEqual([]);
  });

  it.each(WORD_LANGUAGES)("%s has a name and a heatmap layout", (lang) => {
    expect(WORD_LANGUAGE_NAMES[lang]).toBeTruthy();
    const keys = KEYBOARD_ROWS[lang].join("");
    expect(new Set(keys).size).toBe(keys.length);
  });
});
