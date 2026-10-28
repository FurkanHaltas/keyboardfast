"use client";

import { useSyncExternalStore } from "react";

// The address is put together in the browser only, so it never appears in the server-rendered
// HTML that spam harvesters scrape (they rarely run JavaScript). Split so it isn't one string in the bundle either.
const ADDRESS = ["con", "tact"].join("") + String.fromCharCode(64) + ["keyboard", "fast", ".com"].join("");

const noop = () => () => {};

/** mailto link to the contact address; renders as plain text until hydrated. */
export function ContactEmail({ className, children }: { className?: string; children?: React.ReactNode }) {
  const address = useSyncExternalStore(noop, () => ADDRESS, () => null);
  if (!address) return <span className={className}>{children ?? "contact …"}</span>;
  return (
    <a href={`mailto:${address}`} className={className}>
      {children ?? address}
    </a>
  );
}
