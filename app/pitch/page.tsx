"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Layers,
  Target,
  BarChart3,
  DollarSign,
  Shield,
  Download,
  Loader2,
} from "lucide-react";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";
import { useState, useCallback } from "react";

interface Stat {
  value: string;
  label: string;
}
interface Pillar {
  name: string;
  desc: string;
}
interface Capability {
  name: string;
  desc: string;
}
interface TimelineItem {
  year: string;
  name: string;
  desc: string;
}
interface RevenueStream {
  name: string;
  model: string;
  price: string;
}
interface TractionBlock {
  title: string;
  subtitle: string;
  metrics: string[];
}

const pillarIcons = [Shield, Layers, Target, Zap, BarChart3];
const capabilityIcons = [Layers, Shield, Zap, Target, BarChart3];

export default function PitchPage() {
  const { t, tObject } = useLanguage();
  const [generating, setGenerating] = useState(false);

  const stats = tObject<Stat[]>("pitch.contextStats") ?? [];
  const pillars = tObject<Pillar[]>("pitch.insightPillars") ?? [];
  const steps = tObject<string[]>("pitch.solutionSteps") ?? [];
  const capabilities = tObject<Capability[]>("pitch.productCapabilities") ?? [];
  const timeline = tObject<TimelineItem[]>("pitch.marketTimeline") ?? [];
  const streams = tObject<RevenueStream[]>("pitch.modelStreams") ?? [];
  const tractionBlocks = tObject<(TractionBlock & { accent?: string })[]>("pitch.tractionBlocks") ?? [];

  const handleDownloadPdf = useCallback(async () => {
    setGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { PitchPdfDocument } = await import("@/components/pitch-pdf");

      const blob = await pdf(
        PitchPdfDocument({
          contextLabel: t("pitch.contextLabel"),
          contextTitle: t("pitch.contextTitle"),
          contextBody: t("pitch.contextBody"),
          contextStats: stats,
          storyLabel: t("pitch.storyLabel"),
          storyTitle: t("pitch.storyTitle"),
          storyBody: t("pitch.storyBody"),
          insightLabel: t("pitch.insightLabel"),
          insightTitle: t("pitch.insightTitle"),
          insightBody: t("pitch.insightBody"),
          insightPillars: pillars,
          solutionLabel: t("pitch.solutionLabel"),
          solutionTitle: t("pitch.solutionTitle"),
          solutionBody: t("pitch.solutionBody"),
          solutionSteps: steps,
          productLabel: t("pitch.productLabel"),
          productTitle: t("pitch.productTitle"),
          productCapabilities: capabilities,
          tractionLabel: t("pitch.tractionLabel"),
          tractionTitle: t("pitch.tractionTitle"),
          tractionQuote: t("pitch.tractionQuote"),
          tractionBlocks: tractionBlocks,
          marketLabel: t("pitch.marketLabel"),
          marketTitle: t("pitch.marketTitle"),
          marketBody: t("pitch.marketBody"),
          marketTimeline: timeline,
          modelLabel: t("pitch.modelLabel"),
          modelTitle: t("pitch.modelTitle"),
          modelStreams: streams,
          modelColStream: t("pitch.modelColStream"),
          modelColModel: t("pitch.modelColModel"),
          modelColPricing: t("pitch.modelColPricing"),
          visionLabel: t("pitch.visionLabel"),
          visionTitle: t("pitch.visionTitle"),
          visionStatement: t("pitch.visionStatement"),
          visionCta: t("pitch.visionCta"),
          visionEmail: t("pitch.visionEmail"),
        })
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pixl-pitch-deck.pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setGenerating(false);
    }
  }, [t, stats, pillars, steps, capabilities, timeline, streams, tractionBlocks]);

  return (
    <SharedLayout>
      {/* Header */}
      <section className="border-b border-border px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            {t("common.backToEcosystem")}
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">
                <span className="text-muted-foreground mr-2">{">"}</span>
                {t("pitch.title")}
                <span className="animate-blink ml-1">_</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {t("pitch.subtitle")}
              </p>
            </div>
            <button
              onClick={handleDownloadPdf}
              disabled={generating}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary text-sm hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
            >
              {generating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {t("pitch.downloadPdf")}
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: Context */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("pitch.contextLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-6 glow">
            {t("pitch.contextTitle")}
          </h2>
          {stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="border-2 border-border bg-card p-5 text-center pixel-card"
                >
                  <p
                    className={`font-pixel text-3xl sm:text-4xl mb-2 ${i === 1 ? "text-[hsl(var(--gold))] glow-gold" : "text-primary glow"}`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {t("pitch.contextBody")}
          </p>
        </div>
      </section>

      {/* Section 1b: Story */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[hsl(var(--gold))] tracking-[0.2em] mb-3">
            {t("pitch.storyLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-6">
            {t("pitch.storyTitle")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {t("pitch.storyBody")}
          </p>
        </div>
      </section>

      {/* Section 2: Insight */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("pitch.insightLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("pitch.insightTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i] ?? Shield;
              return (
                <div
                  key={i}
                  className="border-2 border-border bg-card p-4 text-center pixel-card border-t-primary border-t-[3px]"
                >
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-semibold text-primary mb-1">
                    {pillar.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            {t("pitch.insightBody")}
          </p>
        </div>
      </section>

      {/* Section 3: Solution */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("pitch.solutionLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8 glow">
            {t("pitch.solutionTitle")}
          </h2>
          {/* Flow — inline text */}
          <p className="text-sm sm:text-base text-primary mb-8 leading-relaxed">
            {steps.map((step, i) => (
              <span key={i}>
                <span className={i === steps.length - 1 ? "text-[hsl(var(--gold))] font-semibold" : ""}>{step}</span>
                {i < steps.length - 1 && <span className="text-muted-foreground mx-2">→</span>}
              </span>
            ))}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {t("pitch.solutionBody")}
          </p>
        </div>
      </section>

      {/* Section 4: Product */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("pitch.productLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("pitch.productTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = capabilityIcons[i % capabilityIcons.length] ?? Layers;
              return (
                <div
                  key={i}
                  className={`border-2 border-border bg-card p-5 pixel-card ${
                    i >= 3
                      ? "border-l-[3px] border-l-[hsl(var(--gold))]"
                      : "border-l-[3px] border-l-primary"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      className={`w-4 h-4 ${i >= 3 ? "text-[hsl(var(--gold))]" : "text-primary"}`}
                    />
                    <p
                      className={`text-sm font-semibold ${i >= 3 ? "text-[hsl(var(--gold))]" : "text-primary"}`}
                    >
                      {cap.name}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Traction */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("pitch.tractionLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("pitch.tractionTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {tractionBlocks.map((block, idx) => {
              const isGold = block.accent === "gold";
              return (
                <div
                  key={idx}
                  className={`border-2 border-border bg-card p-5 border-t-[3px] ${
                    isGold ? "border-t-[hsl(var(--gold))]" : "border-t-primary"
                  }`}
                >
                  <p className={`text-sm font-bold mb-1 ${isGold ? "text-[hsl(var(--gold))]" : "text-primary"}`}>
                    {block.title}
                  </p>
                  <p className="text-xs text-foreground mb-3">{block.subtitle}</p>
                  <ul className="space-y-1">
                    {block.metrics.map((m, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className={`mt-0.5 ${isGold ? "text-[hsl(var(--gold))]" : "text-primary"}`}>&#9656;</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-[hsl(var(--gold))] italic text-center">
            &ldquo;{t("pitch.tractionQuote")}&rdquo;
          </p>
        </div>
      </section>

      {/* Section 6: Market */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("pitch.marketLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("pitch.marketTitle")}
          </h2>
          <div className="space-y-3 mb-8 max-w-xl">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className={`text-xs font-mono shrink-0 ${i === timeline.length - 1 ? "text-primary" : "text-muted-foreground"}`}>
                  {item.year}
                </span>
                <span className={`text-sm font-semibold ${i === timeline.length - 1 ? "text-primary" : "text-foreground"}`}>
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {t("pitch.marketBody")}
          </p>
        </div>
      </section>

      {/* Section 7: Business Model */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("pitch.modelLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("pitch.modelTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {streams.map((stream, i) => (
              <div
                key={i}
                className="border-2 border-border bg-card p-5 pixel-card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-primary">
                    {stream.name}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {stream.model}
                </p>
                <p className="text-sm font-semibold text-[hsl(var(--gold))]">
                  {stream.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Vision */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-[hsl(var(--gold))] tracking-[0.2em] mb-4">
            {t("pitch.visionLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-6">
            {t("pitch.visionTitle")}
          </h2>
          <p className="text-base sm:text-lg text-primary glow mb-10 max-w-2xl mx-auto">
            &ldquo;{t("pitch.visionStatement")}&rdquo;
          </p>
          <p className="font-pixel text-lg sm:text-xl text-[hsl(var(--gold))] glow-gold mb-2">
            {t("pitch.visionCta")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("pitch.visionEmail")}
          </p>
        </div>
      </section>
    </SharedLayout>
  );
}
