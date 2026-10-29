import { ImageResponse } from "next/og";

export const alt = "keyboardfast – typing speed test";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card shown when a keyboardfast link is shared. */
export default function OpengraphImage() {
  const words = ["the", "quick", "brown", "fox", "jumps"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#111317",
          color: "#e8eaee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 52, fontWeight: 700 }}>
          <div
            style={{
              width: 76,
              height: 52,
              borderRadius: 12,
              border: "4px solid #5d6472",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 9,
            }}
          >
            <div style={{ width: 36, height: 9, borderRadius: 3, background: "#f5b041" }} />
          </div>
          <div style={{ display: "flex" }}>
            <span>keyboard</span>
            <span style={{ color: "#f5b041" }}>fast</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, fontSize: 64, fontFamily: "monospace" }}>
          {words.map((w, i) => (
            <span key={w} style={{ color: i < 2 ? "#e8eaee" : "#5d6472" }}>
              {w}
            </span>
          ))}
          <span style={{ width: 5, height: 70, background: "#f5b041", marginLeft: -16 }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30, color: "#8a93a3" }}>
          <span>Typing speed test · 14 languages · code mode</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 96, fontWeight: 700, color: "#f5b041" }}>120</span>
            <span style={{ fontSize: 36, color: "#8a93a3" }}>wpm</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
