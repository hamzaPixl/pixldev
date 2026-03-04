"use client";

import React from "react";
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
  Users,
  TrendingUp,
  Rocket,
} from "lucide-react";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";
import { useState, useCallback } from "react";

interface Stat {
  value: string;
  label: string;
}
interface TractionBlock {
  title: string;
  subtitle: string;
  metrics: string[];
  accent?: string;
}
interface TimelineItem {
  year: string;
  name: string;
  desc: string;
}
interface Capability {
  name: string;
  desc: string;
}
interface InvestorType {
  name: string;
  desc: string;
}
interface FundingStage {
  stage: string;
  raise: string;
  valuation: string;
}

const capabilityIcons = [Layers, DollarSign, Shield, Target, Zap, TrendingUp];
const investorIcons = [BarChart3, Rocket, Users];

export default function InvestPage() {
  const { t, tObject } = useLanguage();
  const [generating, setGenerating] = useState(false);

  const stageStats = tObject<Stat[]>("invest.stageStats") ?? [];
  const fundsBlocks = tObject<TractionBlock[]>("invest.fundsBlocks") ?? [];
  const revenueTimeline = tObject<TimelineItem[]>("invest.revenueTimeline") ?? [];
  const whyPixlCards = tObject<Capability[]>("invest.whyPixlCards") ?? [];
  const milestoneTimeline = tObject<TimelineItem[]>("invest.milestoneTimeline") ?? [];
  const investorTypes = tObject<InvestorType[]>("invest.investorTypes") ?? [];
  const fundingStages = tObject<FundingStage[]>("invest.fundingStages") ?? [];
  const northStarStat = tObject<Stat>("invest.northStarStat") ?? { value: "", label: "" };

  const handleDownloadPdf = useCallback(async () => {
    setGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { InvestPdfDocument } = await import("@/components/invest-pdf");

      const blob = await pdf(
        InvestPdfDocument({
          stageLabel: t("invest.stageLabel"),
          stageTitle: t("invest.stageTitle"),
          stageBody: t("invest.stageBody"),
          stageStats,
          fundsLabel: t("invest.fundsLabel"),
          fundsTitle: t("invest.fundsTitle"),
          fundsBody: t("invest.fundsBody"),
          fundsBlocks,
          revenueLabel: t("invest.revenueLabel"),
          revenueTitle: t("invest.revenueTitle"),
          revenueBody: t("invest.revenueBody"),
          revenueTimeline,
          whyPixlLabel: t("invest.whyPixlLabel"),
          whyPixlTitle: t("invest.whyPixlTitle"),
          whyPixlCards,
          milestoneLabel: t("invest.milestoneLabel"),
          milestoneTitle: t("invest.milestoneTitle"),
          milestoneTimeline,
          northStarLabel: t("invest.northStarLabel"),
          northStarTitle: t("invest.northStarTitle"),
          northStarBody: t("invest.northStarBody"),
          northStarStat,
          investorLabel: t("invest.investorLabel"),
          investorTitle: t("invest.investorTitle"),
          investorTypes,
          pathLabel: t("invest.pathLabel"),
          pathTitle: t("invest.pathTitle"),
          fundingStages,
          pathCta: t("invest.pathCta"),
          pathEmail: t("invest.pathEmail"),
          colStage: t("invest.colStage"),
          colRaise: t("invest.colRaise"),
          colValuation: t("invest.colValuation"),
        })
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pixl-investment-deck.pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setGenerating(false);
    }
  }, [t, stageStats, fundsBlocks, revenueTimeline, whyPixlCards, milestoneTimeline, investorTypes, fundingStages, northStarStat]);

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
                {t("invest.title")}
                <span className="animate-blink ml-1">_</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {t("invest.subtitle")}
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
              {t("invest.downloadPdf")}
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: Current Stage */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("invest.stageLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-6 glow">
            {t("invest.stageTitle")}
          </h2>
          {stageStats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {stageStats.map((stat, i) => (
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
            {t("invest.stageBody")}
          </p>
        </div>
      </section>

      {/* Section 2: Use of Funds */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("invest.fundsLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("invest.fundsTitle")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mb-8">
            {t("invest.fundsBody")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fundsBlocks.map((block, idx) => {
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
        </div>
      </section>

      {/* Section 3: Revenue Projections */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("invest.revenueLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("invest.revenueTitle")}
          </h2>
          <div className="space-y-3 mb-8 max-w-xl">
            {revenueTimeline.map((item, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className={`text-xs font-mono shrink-0 ${i === revenueTimeline.length - 1 ? "text-primary" : "text-muted-foreground"}`}>
                  {item.year}
                </span>
                <span className={`text-sm font-semibold ${i === revenueTimeline.length - 1 ? "text-primary" : "text-foreground"}`}>
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {t("invest.revenueBody")}
          </p>
        </div>
      </section>

      {/* Section 4: Why Pixl */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("invest.whyPixlLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("invest.whyPixlTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyPixlCards.map((cap, i) => {
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

      {/* Section 5: Investor Expectations */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[hsl(var(--gold))] tracking-[0.2em] mb-3">
            {t("invest.milestoneLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("invest.milestoneTitle")}
          </h2>
          <div className="space-y-3 mb-8 max-w-xl">
            {milestoneTimeline.map((item, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className={`text-xs font-mono shrink-0 ${i === milestoneTimeline.length - 1 ? "text-primary" : "text-muted-foreground"}`}>
                  {item.year}
                </span>
                <span className={`text-sm font-semibold ${i === milestoneTimeline.length - 1 ? "text-primary" : "text-foreground"}`}>
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: North Star Metric */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("invest.northStarLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-6 glow">
            {t("invest.northStarTitle")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            {t("invest.northStarBody")}
          </p>
          <div className="border-2 border-primary bg-card p-8 pixel-card max-w-sm mx-auto">
            <p className="font-pixel text-4xl sm:text-5xl text-primary glow mb-2">
              {northStarStat.value}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {northStarStat.label}
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Ideal Investor Type */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[hsl(var(--gold))] tracking-[0.2em] mb-3">
            {t("invest.investorLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("invest.investorTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {investorTypes.map((type, i) => {
              const Icon = investorIcons[i % investorIcons.length] ?? BarChart3;
              return (
                <div
                  key={i}
                  className="border-2 border-border bg-card p-5 pixel-card border-t-[3px] border-t-[hsl(var(--gold))]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-[hsl(var(--gold))]" />
                    <p className="text-sm font-semibold text-[hsl(var(--gold))]">
                      {type.name}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {type.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 8: The Path */}
      <section className="px-4 sm:px-6 py-10 sm:py-16 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary tracking-[0.2em] mb-3">
            {t("invest.pathLabel")}
          </p>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-8">
            {t("invest.pathTitle")}
          </h2>
          {/* Table */}
          <div className="max-w-2xl mb-8">
            <div className="grid grid-cols-3 border-2 border-border">
              <div className="bg-primary p-3">
                <p className="text-xs font-bold text-primary-foreground">{t("invest.colStage")}</p>
              </div>
              <div className="bg-primary p-3">
                <p className="text-xs font-bold text-primary-foreground">{t("invest.colRaise")}</p>
              </div>
              <div className="bg-primary p-3">
                <p className="text-xs font-bold text-primary-foreground">{t("invest.colValuation")}</p>
              </div>
              {fundingStages.map((row, i) => (
                <React.Fragment key={i}>
                  <div className="bg-card p-3 border-t border-border">
                    <p className="text-xs font-semibold text-primary">{row.stage}</p>
                  </div>
                  <div className="bg-card p-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">{row.raise}</p>
                  </div>
                  <div className="bg-card p-3 border-t border-border">
                    <p className="text-xs text-[hsl(var(--gold))]">{row.valuation}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: CTA / Vision */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-[hsl(var(--gold))] tracking-[0.2em] mb-4">
            {t("invest.pathLabel")}
          </p>
          <p className="font-pixel text-lg sm:text-xl text-[hsl(var(--gold))] glow-gold mb-6">
            {t("invest.pathCta")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("invest.pathEmail")}
          </p>
        </div>
      </section>
    </SharedLayout>
  );
}
