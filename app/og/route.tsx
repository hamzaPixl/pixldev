import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const BG = "#08090A";
const CARD = "#0F1011";
const PANEL = "#0B0C0E";
const HAIRLINE = "rgba(255,255,255,0.08)";
const TEXT = "#F7F8F8";
const MUTED = "#8A8F98";
const GREEN = "#30CB77";

function hexToRgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, "$1$1") : h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Pixl").slice(0, 120);
  const eyebrow = searchParams.get("eyebrow") ?? "";
  const image = searchParams.get("image");
  let accent = searchParams.get("accent") ?? GREEN;
  if (!accent.startsWith("#")) accent = `#${accent}`;

  const titleSize = title.length > 52 ? 50 : title.length > 34 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          padding: 40,
          fontFamily: "sans-serif",
        }}
      >
        {/* Card */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            gap: 44,
            background: CARD,
            border: `1px solid ${HAIRLINE}`,
            borderRadius: 28,
            padding: 48,
          }}
        >
          {/* Left column */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Brand mark */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: GREEN,
                  display: "flex",
                }}
              />
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: TEXT,
                  letterSpacing: -1,
                  display: "flex",
                }}
              >
                Pixl
              </div>
            </div>

            {/* Eyebrow + title */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {eyebrow ? (
                <div
                  style={{
                    fontSize: 20,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: accent,
                    display: "flex",
                  }}
                >
                  {eyebrow}
                </div>
              ) : null}
              <div
                style={{
                  fontSize: titleSize,
                  fontWeight: 700,
                  color: TEXT,
                  lineHeight: 1.08,
                  letterSpacing: -2,
                  display: "flex",
                }}
              >
                {title}
              </div>
            </div>

            {/* spacer keeps title vertically centred */}
            <div style={{ display: "flex", height: 34 }} />
          </div>

          {/* Right visual panel */}
          <div
            style={{
              width: 420,
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              position: "relative",
              background: PANEL,
              border: `1px solid ${HAIRLINE}`,
            }}
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt=""
                width={420}
                height={454}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  background: `radial-gradient(130% 130% at 108% 112%, ${accent} 0%, ${hexToRgba(
                    accent,
                    0.4
                  )} 26%, ${hexToRgba(accent, 0.08)} 48%, ${PANEL} 66%)`,
                }}
              />
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 8px 4px",
          }}
        >
          <div style={{ fontSize: 24, color: MUTED, display: "flex", letterSpacing: -0.5 }}>
            pixldev.be
          </div>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
