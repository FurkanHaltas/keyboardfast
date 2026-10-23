import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "keyboardfast – typing speed test",
    short_name: "keyboardfast",
    description: "A clean, fast typing test in many languages, with a code mode and progress tracking.",
    start_url: "/",
    display: "standalone",
    background_color: "#111317",
    theme_color: "#111317",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
