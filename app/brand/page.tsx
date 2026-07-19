import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Archivo } from "next/font/google";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { PixlMark } from "@/components/brand/pixl-mark";
import { PixlMotion } from "@/components/brand/pixl-motion";
import { PIXL_ASSETS, PIXL_COLORS, PIXL_MOTION, PIXL_OG_PREVIEWS } from "@/lib/brand-kit";
import "./brand.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--brand-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brand system",
  description: "The Pixl identity, pictogram, motion language, Open Graph templates and production rules.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Pixl brand system",
    description: "One pixel becomes a frame, a signal and a system.",
    images: ["/og?eyebrow=Brand%20system&title=One%20pixel.%20A%20whole%20system."],
  },
};

const usageRules = [
  ["Clear space", "Keep one center-pixel width free on every side."],
  ["Minimum size", "Use the pictogram from 16px. Use the full lockup from 72px."],
  ["Color", "Signal Green on Deep Ground is the primary signature."],
  ["Motion", "Build once on entry. Never loop the full construction."],
] as const;

export default function BrandPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main id="main" className={`brand-page ${archivo.variable}`}>
      <header className="brand-header">
        <Link href="/" className="brand-lockup" aria-label="Pixl home">
          <PixlMark />
          <span>pixl</span>
        </Link>
        <nav aria-label="Brand book sections">
          <a href="#motion">Motion</a>
          <a href="#identity">Identity</a>
          <a href="#og">Open Graph</a>
          <a href="#system">System</a>
        </nav>
        <span className="brand-header-state">Local review</span>
      </header>

      <section className="brand-hero" aria-labelledby="brand-title">
        <div className="brand-hero-copy">
          <p>Pixl identity system</p>
          <h1 id="brand-title">ONE PIXEL.<br />A WHOLE SYSTEM.</h1>
        </div>
        <p className="brand-hero-note">
          The pixel is not decoration. It is the smallest executable unit, framed as a conversation and connected to the products around it.
        </p>
        <PixlMark className="brand-hero-mark" />
      </section>

      <section id="motion" className="brand-section brand-motion-section">
        <div className="brand-section-intro">
          <div>
            <span>Motion language</span>
            <h2>The mark explains itself.</h2>
          </div>
          <p>The center pixel blinks three times. An equal-size child is extracted, drops below and turns right to trace the complete Pixl pictogram as one continuous progress path.</p>
        </div>
        <PixlMotion />
        <div className="brand-motion-variant-heading">
          <strong>Signal White</strong>
          <span>Identical motion for dark monochrome applications and export.</span>
        </div>
        <PixlMotion variant="white" showStoryboard={false} />
        <div className="brand-motion-specs">
          {PIXL_MOTION.map((motion) => (
            <article key={motion.key}>
              <code>{motion.key}</code>
              <div className={`motion-mini motion-mini-${motion.key.replace(".", "-")}`} aria-hidden="true">
                {motion.key === "content.reveal" ? <><i /><i /><i /></> : <PixlMark />}
              </div>
              <strong>{motion.name}</strong>
              <p>{motion.purpose}</p>
              <span>{motion.duration} / {motion.repeat}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="identity" className="brand-section">
        <div className="brand-section-intro">
          <div>
            <span>Canonical identity</span>
            <h2>Pictogram, lockup, signal.</h2>
          </div>
          <p>The new standalone SVG turns the pictogram into a first-class asset. It is no longer trapped inside the full logo file.</p>
        </div>

        <div className="identity-grid">
          <article className="identity-mark-board">
            <PixlMark title="Pixl pictogram" />
            <footer><strong>Pictogram</strong><span>448 x 550 viewBox</span></footer>
          </article>
          <article className="identity-lockup-board">
            <Image src="/logo.svg" alt="Pixl wordmark" width={1280} height={551} priority />
            <footer><strong>Primary lockup</strong><span>Dark surfaces</span></footer>
          </article>
          <article className="identity-small-board">
            {[16, 24, 32, 64].map((size) => (
              <div key={size}>
                <PixlMark />
                <span>{size}px</span>
              </div>
            ))}
          </article>
        </div>

        <div className="brand-rules">
          {usageRules.map(([title, copy]) => (
            <article key={title}><strong>{title}</strong><p>{copy}</p></article>
          ))}
        </div>

        <div className="asset-list">
          {PIXL_ASSETS.map((asset) => (
            <article key={asset.key}>
              <code>{asset.key}</code>
              <div><strong>{asset.label}</strong><span>{asset.use}</span></div>
              <b>{asset.format}</b>
              <a href={asset.path} download aria-label={`Download ${asset.label}`}>
                <ArrowDownToLine aria-hidden="true" size={17} />
                Download
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-section brand-color-section">
        <div className="brand-section-intro">
          <div><span>Color system</span><h2>One active signal.</h2></div>
          <p>Green identifies Pixl itself. Product colors can branch from the system, but the parent identity stays disciplined.</p>
        </div>
        <div className="color-track">
          {PIXL_COLORS.map((color, index) => (
            <article key={color.key} style={{ "--swatch": color.value, "--span": index === 0 ? 2 : 1 } as CSSProperties}>
              <span />
              <div><strong>{color.name}</strong><code>{color.value}</code><p>{color.role}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="og" className="brand-section">
        <div className="brand-section-intro">
          <div><span>Sharing system</span><h2>Open Graph with a point of view.</h2></div>
          <p>Every card keeps the same safe zones, mark scale and type rhythm. The content changes. The composition remains recognizably Pixl.</p>
        </div>
        <div className="og-grid">
          {PIXL_OG_PREVIEWS.map((preview) => (
            <figure key={preview.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview.src} alt={`${preview.label} Open Graph card preview`} width="1200" height="630" />
              <figcaption><strong>{preview.label}</strong><span>1200 x 630</span><a href={preview.src} target="_blank" rel="noreferrer">Open render <ArrowUpRight aria-hidden="true" size={15} /></a></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="system" className="brand-section brand-system-section">
        <div className="brand-section-intro">
          <div><span>Production contract</span><h2>Assets humans and agents can share.</h2></div>
          <p>Stable keys prevent every campaign or product from redrawing the brand. Templates own layout. Inputs provide the communication job.</p>
        </div>
        <div className="system-grid">
          <div className="system-statement">
            <strong>5</strong>
            <span>semantic colors</span>
            <strong>3</strong>
            <span>canonical assets</span>
            <strong>3</strong>
            <span>motion patterns</span>
          </div>
          <pre><span>brand.asset.json</span>{`{
  "brandId": "pixl",
  "channel": "open-graph",
  "job": "positioning",
  "variant": "signal",
  "headline": "Models are not the product.",
  "assetKey": "mark.signal",
  "templateVersion": "1.0.0"
}`}</pre>
        </div>
      </section>

      <footer className="brand-footer">
        <div className="brand-lockup"><PixlMark /><span>pixl</span></div>
        <p>Brand review surface. Not indexed until approved.</p>
        <Link href="/">Back to pixldev.be <ArrowUpRight aria-hidden="true" size={15} /></Link>
      </footer>
    </main>
  );
}
