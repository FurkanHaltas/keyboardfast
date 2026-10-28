import { describe, expect, it } from "vitest";
import { LOCALES } from "@/i18n/config";
import { getAbout, getGuides, GUIDE_SLUGS } from "./guides";

describe("guides", () => {
  it("every locale has the about page and every guide, with the same slugs", () => {
    for (const l of LOCALES) {
      expect(getAbout(l).title).toBeTruthy();
      expect(getGuides(l).map((g) => g.slug)).toEqual(GUIDE_SLUGS);
    }
  });

  it("translations aren't left in English", () => {
    for (const l of LOCALES.filter((l) => l !== "en")) {
      getGuides(l).forEach((g, i) => expect(g.title).not.toBe(getGuides("en")[i].title));
    }
  });
});
