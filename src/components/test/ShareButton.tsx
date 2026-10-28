"use client";

import { Check, Copy, Download, Loader2, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fmt } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { renderCard, type CardData } from "@/lib/shareCard";

const SITE = "https://keyboardfast.com";

/**
 * Shares a finished test as an image card. On touch devices that can share files it opens
 * the system share sheet; elsewhere it offers download, copy and post-on-X.
 */
export function ShareButton({ card }: { card: Omit<CardData, "labels"> }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const text = fmt(t.results.shareText, { wpm: Math.round(card.wpm), acc: Math.round(card.acc), mode: card.mode });
  const url = `${SITE}/${locale}`;
  const image = () => renderCard({ ...card, labels: { wpm: t.results.wpm, acc: t.results.cardAccuracy } });
  const fileName = `keyboardfast-${Math.round(card.wpm)}wpm.png`;

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const share = async () => {
    if (!matchMedia("(pointer: coarse)").matches || !navigator.canShare) {
      setOpen((o) => !o);
      return;
    }
    setBusy(true);
    try {
      const file = new File([await image()], fileName, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${text} ${url}` });
        return;
      }
    } catch (e) {
      // AbortError: the user closed the share sheet – nothing else to do.
      if (e instanceof DOMException && e.name === "AbortError") return;
    } finally {
      setBusy(false);
    }
    setOpen(true);
  };

  const download = async () => {
    const href = URL.createObjectURL(await image());
    const a = Object.assign(document.createElement("a"), { href, download: fileName });
    a.click();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    setOpen(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(`${text} ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const postX = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const item = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-bg";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={share}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sub transition-colors hover:bg-raised hover:text-text"
      >
        {busy ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />} {t.results.share}
      </button>
      {open && (
        <div className="fade-up absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-xl border border-line bg-raised p-1.5 shadow-2xl">
          <button type="button" onClick={download} className={item}>
            <Download size={15} className="text-sub" /> {t.results.shareDownload}
          </button>
          <button type="button" onClick={copy} className={item}>
            {copied ? <Check size={15} className="text-main" /> : <Copy size={15} className="text-sub" />}
            {copied ? t.results.shareCopied : t.results.shareCopy}
          </button>
          <a href={postX} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={item}>
            <XLogo /> {t.results.sharePostX}
          </a>
        </div>
      )}
    </div>
  );
}

function XLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="ml-px text-sub">
      <path
        fill="currentColor"
        d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"
      />
    </svg>
  );
}
