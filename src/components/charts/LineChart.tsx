"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface Series {
  id: string;
  label: string;
  values: (number | null)[];
  /** CSS color, typically a theme variable */
  color: string;
  dashed?: boolean;
  /** draw a dot at every point (useful for sparse per-test data) */
  dots?: boolean;
  /** dots only, no connecting line */
  noLine?: boolean;
  format?: (v: number) => string;
}

export interface Marker {
  index: number;
  /** value used for the tooltip row */
  value: number;
}

interface Props {
  series: Series[];
  /** secondary-encoded event marks (✕) drawn on top of the first series */
  markers?: { label: string; color: string; points: Marker[] };
  xLabel: (i: number) => string;
  tooltipTitle: (i: number) => string;
  height?: number;
  yMin?: number;
  yMax?: number;
  ariaLabel: string;
}

const PAD = { top: 12, right: 12, bottom: 26, left: 40 };

function niceMax(v: number) {
  if (v <= 0) return 10;
  const exp = 10 ** Math.floor(Math.log10(v));
  const f = v / exp;
  const step = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return step * exp;
}

export function LineChart({ series, markers, xLabel, tooltipTitle, height = 220, yMin, yMax, ariaLabel }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = Math.max(...series.map((s) => s.values.length), 1);
  const { lo, hi, ticks } = useMemo(() => {
    const all = series.flatMap((s) => s.values.filter((v): v is number => v != null));
    const lo = yMin ?? 0;
    const hi = yMax ?? niceMax(Math.max(...all, 1) * 1.08);
    const ticks = Array.from({ length: 5 }, (_, i) => lo + ((hi - lo) * i) / 4);
    return { lo, hi, ticks };
  }, [series, yMin, yMax]);

  const iw = Math.max(width - PAD.left - PAD.right, 1);
  const ih = height - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (v: number) => PAD.top + ih - ((v - lo) / (hi - lo || 1)) * ih;

  const path = (values: (number | null)[]) => {
    let d = "";
    let pen = false;
    values.forEach((v, i) => {
      if (v == null) {
        pen = false;
        return;
      }
      d += `${pen ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
      pen = true;
    });
    return d;
  };

  const xTicks = useMemo(() => {
    const count = Math.min(n, width < 480 ? 4 : 7);
    if (count <= 1) return [0];
    return [...new Set(Array.from({ length: count }, (_, k) => Math.round((k * (n - 1)) / (count - 1))))];
  }, [n, width]);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - PAD.left;
    const i = n === 1 ? 0 : Math.round((px / iw) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  const markerAt = (i: number) => markers?.points.find((m) => m.index === i);
  const first = series[0];
  const showLegend = series.length > 1 || !!markers?.points.length;

  return (
    <div className="w-full">
      {showLegend && (
        <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-sub">
          {series.map((s) => (
            <span key={s.id} className="flex items-center gap-2">
              <svg width="18" height="8" aria-hidden>
                {s.noLine ? (
                  <circle cx="9" cy="4" r="3" fill={s.color} />
                ) : (
                  <line x1="1" y1="4" x2="17" y2="4" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeDasharray={s.dashed ? "3 3" : undefined} />
                )}
              </svg>
              {s.label}
            </span>
          ))}
          {markers && markers.points.length > 0 && (
            <span className="flex items-center gap-2">
              <svg width="12" height="12" aria-hidden>
                <Cross cx={6} cy={6} color={markers.color} />
              </svg>
              {markers.label}
            </span>
          )}
        </div>
      )}
      <div ref={wrap} className="relative w-full" style={{ height }}>
        {width > 0 && (
          <svg
            width={width}
            height={height}
            role="img"
            aria-label={ariaLabel}
            className="touch-none select-none overflow-visible"
            onPointerMove={onMove}
            onPointerDown={onMove}
            onPointerLeave={() => setHover(null)}
          >
            {ticks.map((t) => (
              <g key={t}>
                <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth="1" />
                <text x={PAD.left - 10} y={y(t)} dy="0.32em" textAnchor="end" className="fill-sub font-mono text-[10px]">
                  {Math.round(t)}
                </text>
              </g>
            ))}
            {xTicks.map((i) => (
              <text key={i} x={x(i)} y={height - 6} textAnchor="middle" className="fill-sub font-mono text-[10px]">
                {xLabel(i)}
              </text>
            ))}

            {series.filter((s) => !s.noLine).map((s) => (
              <path
                key={s.id}
                d={path(s.values)}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={s.dashed ? "4 4" : undefined}
              />
            ))}
            {series.map(
              (s) =>
                s.dots &&
                s.values.map((v, i) =>
                  v == null ? null : (
                    <circle key={`${s.id}${i}`} cx={x(i)} cy={y(v)} r={n > 60 ? 2.5 : 4} fill={s.color} stroke="var(--bg)" strokeWidth="1.5" />
                  ),
                ),
            )}
            {markers?.points.map((m) => {
              const v = first.values[m.index];
              return v == null ? null : <Cross key={m.index} cx={x(m.index)} cy={y(v) - 12} color={markers.color} />;
            })}

            {hover != null && (
              <g pointerEvents="none">
                <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + ih} stroke="var(--sub)" strokeWidth="1" strokeDasharray="2 3" />
                {series.map((s) => {
                  const v = s.values[hover];
                  return v == null ? null : (
                    <circle key={s.id} cx={x(hover)} cy={y(v)} r="4.5" fill={s.color} stroke="var(--bg)" strokeWidth="2" />
                  );
                })}
              </g>
            )}
          </svg>
        )}
        {hover != null && width > 0 && (
          <div
            className="pointer-events-none absolute top-0 z-10 w-[170px] rounded-lg border border-line bg-raised px-3 py-2 text-xs shadow-lg shadow-black/20"
            style={{ left: tooltipLeft(x(hover), width) }}
          >
            <div className="mb-1.5 font-medium text-text">{tooltipTitle(hover)}</div>
            {series.map((s) => {
              const v = s.values[hover];
              return v == null ? null : (
                <div key={s.id} className="flex items-center justify-between gap-4 text-sub">
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-3 rounded" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-mono text-text">{s.format ? s.format(v) : v}</span>
                </div>
              );
            })}
            {markers && markerAt(hover) && (
              <div className="flex items-center justify-between gap-4 text-sub">
                <span>{markers.label}</span>
                <span className="font-mono text-text">{markerAt(hover)!.value}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const TOOLTIP_W = 170;

/** Places the tooltip right of the crosshair, flipping left near the edge. */
function tooltipLeft(px: number, width: number) {
  const right = px + 14;
  if (right + TOOLTIP_W <= width) return right;
  return Math.max(0, px - 14 - TOOLTIP_W);
}

function Cross({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  const r = 3.5;
  return (
    <svg x={cx - 6} y={cy - 6} width="12" height="12" overflow="visible" aria-hidden>
      <path d={`M${6 - r},${6 - r}L${6 + r},${6 + r}M${6 + r},${6 - r}L${6 - r},${6 + r}`} stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
