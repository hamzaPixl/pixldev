import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const BG = "#08090A";
const CARD = "#0F1011";
const GREEN = "#2DD26E";
const TEXT = "#F7F8F8";
const MUTED = "#8A8F98";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Pixl").slice(0, 140);
  const subtitle = searchParams.get("subtitle") ?? "pixldev.be";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: GREEN,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: TEXT,
              letterSpacing: -1,
              display: "flex",
            }}
          >
            Pixl
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 960,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 52 : 64,
              fontWeight: 700,
              color: TEXT,
              lineHeight: 1.15,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${CARD}`,
            paddingTop: 32,
          }}
        >
          <div style={{ fontSize: 26, color: MUTED, display: "flex" }}>
            {subtitle}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: GREEN, display: "flex" }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: CARD, border: `1px solid ${MUTED}33`, display: "flex" }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: CARD, border: `1px solid ${MUTED}33`, display: "flex" }} />
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
