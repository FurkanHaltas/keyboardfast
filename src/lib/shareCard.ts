"use client";

/** What the share card shows. */
export interface CardData {
  wpm: number;
  acc: number;
  /** e.g. "time 30 · English" */
  mode: string;
  /** per-second net WPM, for the sparkline */
  series: number[];
  labels: { wpm: string; acc: string };
}

const W = 1200;
const H = 630;

/**
 * Draws a 1200×630 result card (the Open Graph size social apps expect) in the current
 * theme's colours, entirely in the browser – no result data is sent anywhere.
 */
export async function renderCard(d: CardData): Promise<Blob> {
  await document.fonts.ready;
  const css = getComputedStyle(document.body);
  const v = (name: string) => css.getPropertyValue(name).trim();
  const c = { bg: v("--bg"), raised: v("--raised"), text: v("--text"), sub: v("--sub"), main: v("--main"), line: v("--line") };
  const sans = css.fontFamily;
  const mono = `${v("--font-jetbrains") || "ui-monospace"}, monospace`;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext("2d")!;

  g.fillStyle = c.bg;
  g.fillRect(0, 0, W, H);
  g.beginPath();
  g.roundRect(40, 40, W - 80, H - 80, 36);
  g.fillStyle = c.raised;
  g.fill();

  // Brand
  g.textBaseline = "alphabetic";
  g.font = `600 40px ${sans}`;
  g.fillStyle = c.text;
  g.fillText("keyboard", 96, 128);
  const kw = g.measureText("keyboard").width;
  g.fillStyle = c.main;
  g.fillText("fast", 96 + kw, 128);

  // Big number
  const wpm = String(Math.round(d.wpm));
  // Shrink long numbers so they never run into the chart on the right.
  g.font = `700 220px ${mono}`;
  const fit = Math.min(220, Math.floor((220 * 380) / g.measureText(wpm).width));
  g.font = `700 ${fit}px ${mono}`;
  g.fillStyle = c.main;
  g.fillText(wpm, 88, 390);
  const numW = g.measureText(wpm).width;
  g.font = `500 44px ${sans}`;
  g.fillStyle = c.sub;
  g.fillText(d.labels.wpm, 100 + numW, 390);

  // Accuracy and mode
  g.font = `600 48px ${mono}`;
  g.fillStyle = c.text;
  const acc = `${Math.round(d.acc)}%`;
  g.fillText(acc, 96, 476);
  const accW = g.measureText(acc).width;
  g.font = `400 36px ${sans}`;
  g.fillStyle = c.sub;
  g.fillText(d.labels.acc, 112 + accW, 476);
  g.fillText(d.mode, 96, 532);

  drawSparkline(g, d.series, { x: 640, y: 190, w: 470, h: 250 }, c.main, c.line);

  g.font = `500 30px ${sans}`;
  g.fillStyle = c.sub;
  g.textAlign = "right";
  g.fillText("keyboardfast.com", W - 96, H - 92);

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))), "image/png"));
}

function drawSparkline(
  g: CanvasRenderingContext2D,
  series: number[],
  box: { x: number; y: number; w: number; h: number },
  color: string,
  grid: string,
) {
  g.strokeStyle = grid;
  g.lineWidth = 2;
  for (let i = 0; i <= 3; i++) {
    const y = box.y + (box.h / 3) * i;
    g.beginPath();
    g.moveTo(box.x, y);
    g.lineTo(box.x + box.w, y);
    g.stroke();
  }
  if (series.length < 2) return;
  const max = Math.max(...series, 1) * 1.1;
  const pts = series.map((s, i) => [box.x + (box.w * i) / (series.length - 1), box.y + box.h - (box.h * s) / max] as const);

  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.lineTo(box.x + box.w, box.y + box.h);
  g.lineTo(box.x, box.y + box.h);
  g.closePath();
  const fill = g.createLinearGradient(0, box.y, 0, box.y + box.h);
  fill.addColorStop(0, withAlpha(color, 0.35));
  fill.addColorStop(1, withAlpha(color, 0));
  g.fillStyle = fill;
  g.fill();

  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.strokeStyle = color;
  g.lineWidth = 6;
  g.lineJoin = "round";
  g.lineCap = "round";
  g.stroke();
}

/** Theme colours are hex; canvas gradients need an alpha version. */
function withAlpha(hex: string, a: number) {
  const m = hex.match(/^#?([0-9a-f]{6})$/i);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
