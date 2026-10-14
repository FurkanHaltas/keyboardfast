"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props<T extends string> {
  value: T;
  options: readonly T[];
  label: (v: T) => string;
  onChange: (v: T) => void;
  ariaLabel: string;
  icon?: React.ReactNode;
  className?: string;
}

/** Small accessible dropdown used in the config bar. */
export function Menu<T extends string>({ value, options, label, onChange, ariaLabel, icon, className = "" }: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sub transition-colors hover:text-text"
      >
        {icon}
        <span className="text-text">{label(value)}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="fade-up absolute left-1/2 z-30 mt-2 max-h-80 w-48 -translate-x-1/2 overflow-auto rounded-xl border border-line bg-raised p-1 shadow-xl shadow-black/20"
        >
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={o === value}
                onClick={() => {
                  setOpen(false);
                  onChange(o);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-text transition-colors hover:bg-line"
              >
                {label(o)}
                {o === value && <Check size={15} className="text-main" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
