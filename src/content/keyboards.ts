import type { WordLanguage } from "./words";

/** Letter rows of the usual physical layout for each typing language (heatmap only). */
export const KEYBOARD_ROWS: Record<WordLanguage, string[]> = {
  en: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
  tr: ["qwertyuıopğü", "asdfghjklşi", "zxcvbnmöç"],
  de: ["qwertzuiopü", "asdfghjklöä", "yxcvbnmß"],
  es: ["qwertyuiop", "asdfghjklñ", "zxcvbnm"],
  fr: ["azertyuiop", "qsdfghjklm", "wxcvbn"],
  pt: ["qwertyuiop", "asdfghjklç", "zxcvbnm"],
};
