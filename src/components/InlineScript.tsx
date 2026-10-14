"use client";

/**
 * Inline script that runs during HTML parsing (before first paint). On the client it is
 * rendered as text/plain so React does not warn about script tags; the server copy already ran.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
