import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const BG = "#08090A";
const CARD = "#111411";
const HAIRLINE = "#28302B";
const TEXT = "#F7F8F8";
const MUTED = "#8A8F98";
const GREEN = "#30CB77";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Pixl").slice(0, 120);
  const eyebrow = searchParams.get("eyebrow") ?? "";
  // Optional editorial image. Without one, the canonical Pixl mark is the subject.
  const imageParam = searchParams.get("image");
  const image = imageParam
    ? imageParam.startsWith("http")
      ? imageParam
      : `${origin}${imageParam.startsWith("/") ? "" : "/"}${imageParam}`
    : null;
  let accent = searchParams.get("accent") ?? GREEN;
  if (!accent.startsWith("#")) accent = `#${accent}`;

  const titleSize = title.length > 72 ? 54 : title.length > 48 ? 62 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          padding: 0,
          fontFamily: "sans-serif",
          border: `18px solid ${accent}`,
        }}
      >
        {/* Registration grid */}
        <div style={{ position: "absolute", left: 64, right: 64, top: 98, height: 1, background: HAIRLINE, display: "flex" }} />
        <div style={{ position: "absolute", left: 64, right: 64, bottom: 68, height: 1, background: HAIRLINE, display: "flex" }} />
        <div style={{ position: "absolute", top: 48, bottom: 48, left: 64, width: 1, background: HAIRLINE, display: "flex" }} />
        <div style={{ position: "absolute", top: 48, bottom: 48, left: 748, width: 1, background: HAIRLINE, display: "flex" }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            padding: "48px 64px 52px",
          }}
        >
          <div
            style={{
              width: 684,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingRight: 54,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <PixlOgMark size={30} color={accent} />
              <span style={{ display: "flex", color: TEXT, fontSize: 28, fontWeight: 800, letterSpacing: -1.5 }}>pixl</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {eyebrow ? (
                <div
                  style={{
                    fontSize: 17,
                    letterSpacing: 3.5,
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
                  fontWeight: 800,
                  color: TEXT,
                  lineHeight: 0.98,
                  letterSpacing: -3.5,
                  display: "flex",
                }}
              >
                {title}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, color: MUTED, fontSize: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: accent, display: "flex" }} />
              <span style={{ display: "flex" }}>pixldev.be</span>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              background: CARD,
              border: `1px solid ${HAIRLINE}`,
            }}
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" width={420} height={454} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <>
                <div style={{ position: "absolute", width: "78%", height: 1, background: HAIRLINE, display: "flex" }} />
                <div style={{ position: "absolute", height: "78%", width: 1, background: HAIRLINE, display: "flex" }} />
                <PixlOgMark size={292} color={accent} />
              </>
            )}
            <div style={{ position: "absolute", top: 18, right: 18, color: accent, fontSize: 14, letterSpacing: 2.5, display: "flex" }}>SIGNAL / SYSTEM</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

function PixlOgMark({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size * 1.23} viewBox="0 0 448 550" style={{ display: "flex" }}>
      <path fill={color} fillRule="evenodd" d="M51 0h346v51h51v346h-51v51H210L99 550H0V51h51V0Zm39 90v343l70-73h198V90H90Z" />
      <rect x="178" y="174" width="93" height="93" rx="8" fill={color} />
    </svg>
  );
}
