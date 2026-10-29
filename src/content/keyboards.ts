import type { WordLanguage } from "./words";

/**
 * Letter rows of the usual physical layout for each typing language (heatmap only).
 * Czech letters on the number row get a row of their own above; Polish AltGr letters one below.
 */
export const KEYBOARD_ROWS: Record<WordLanguage, string[]> = {
  en: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
  tr: ["qwertyuıopğü", "asdfghjklşi", "zxcvbnmöç"],
  de: ["qwertzuiopü", "asdfghjklöä", "yxcvbnmß"],
  es: ["qwertyuiop", "asdfghjklñ", "zxcvbnm"],
  fr: ["azertyuiop", "qsdfghjklm", "wxcvbn"],
  pt: ["qwertyuiop", "asdfghjklç", "zxcvbnm"],
  it: ["qwertyuiopè", "asdfghjklòàù", "zxcvbnm"],
  nl: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
  pl: ["qwertyuiop", "asdfghjkl", "zxcvbnm", "ąćęłńóśźż"],
  sv: ["qwertyuiopå", "asdfghjklöä", "zxcvbnm"],
  cs: ["ěščřžýáíé", "qwertzuiopú", "asdfghjklů", "yxcvbnm"],
  id: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
  ru: ["йцукенгшщзхъ", "фывапролджэ", "ячсмитьбю"],
  uk: ["йцукенгшщзхї", "фівапролджє", "ячсмитьбю"],
};
