"use client";

import { useEffect, useState } from "react";
import { Zap, ArrowRight, ExternalLink } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getVisibleProductsStatic } from "@/lib/products";
import { cn } from "@/lib/utils";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";

type FilterType = "all" | "live" | "coming-soon" | "planned";

export default function Home() {
  const products = getVisibleProductsStatic();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = products.filter((product) => {
    if (product.status === "contact") return true;
    if (filter === "all") return true;
    return product.status === filter;
  });

  const legendItems: { status: FilterType; label: string; style: string; activeStyle: string }[] = [
    {
      status: "all",
      label: t("filters.all"),
      style: "border-foreground/30 bg-foreground/10",
      activeStyle: "border-foreground bg-foreground/30",
    },
    {
      status: "live",
      label: t("filters.online"),
      style: "border-primary/30 bg-primary/10",
      activeStyle: "border-primary bg-primary/30",
    },
    {
      status: "coming-soon",
      label: t("filters.comingSoon"),
      style: "border-gold/30 bg-gold/10",
      activeStyle: "border-gold bg-gold/30",
    },
    {
      status: "planned",
      label: t("filters.planned"),
      style: "border-border bg-muted/50",
      activeStyle: "border-muted-foreground bg-muted",
    },
  ];

  return (
    <SharedLayout>
      {/* Hero Header */}
      <section className="border-b border-border px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero text */}
          <div className="max-w-2xl">
            <div className="mb-4">
              <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed">
                <span className="inline-block animate-fade-in" style={{ animationDelay: "0ms" }}>
                  <span className="text-muted-foreground mr-2">{">"}</span>
                  {t("home.heroTitle1")}
                </span>
                <br />
                <span className="inline-block animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <span className="text-muted-foreground mr-2">{">"}</span>
                  <span className="text-primary glow">{t("home.heroTitle2")}</span>
                  <span className="animate-blink ml-1">_</span>
                </span>
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6">
              {t("home.heroSubtitle")}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-primary mb-6 sm:mb-8">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t("home.selectModule")}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base cursor-pointer [&_*]:pointer-events-none"
              >
                {t("common.buildWithUs")}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://feen.be"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors text-sm sm:text-base cursor-pointer [&_*]:pointer-events-none"
              >
                {t("common.tryFeen")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section header with stats */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="font-pixel text-base sm:text-lg md:text-xl text-primary">
              {t("home.modulesTitle")}
            </h2>
            <div className="hidden sm:block flex-1 border-t border-border" />
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5">
                <span className="font-pixel text-base sm:text-lg text-primary">2</span>
                <span className="font-pixel text-sm sm:text-base text-muted-foreground">{t("home.stats.online")}</span>
              </span>
              <span className="w-px h-4 bg-gradient-to-b from-transparent via-border to-transparent" />
              <span className="flex items-center gap-1.5">
                <span className="font-pixel text-base sm:text-lg text-gold">2</span>
                <span className="font-pixel text-sm sm:text-base text-muted-foreground">{t("home.stats.coming")}</span>
              </span>
              <span className="w-px h-4 bg-gradient-to-b from-transparent via-border to-transparent" />
              <span className="flex items-center gap-1.5">
                <span className="font-pixel text-base sm:text-lg text-muted-foreground">3+</span>
                <span className="font-pixel text-sm sm:text-base text-muted-foreground">{t("home.stats.planned")}</span>
              </span>
            </div>
          </div>

          {/* Legend / Filter */}
          <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
            {legendItems.map((item) => (
              <button
                key={item.status}
                onClick={() => setFilter(item.status)}
                className={cn(
                  "flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 transition-all cursor-pointer",
                  filter === item.status ? item.activeStyle : item.style,
                  "hover:opacity-80"
                )}
              >
                <div
                  className={cn(
                    "w-2 h-2 sm:w-2.5 sm:h-2.5 border",
                    item.status === "all" && "border-foreground/50 bg-foreground/20",
                    item.status === "live" && "border-primary bg-primary/30",
                    item.status === "coming-soon" && "border-gold bg-gold/30",
                    item.status === "planned" && "border-muted-foreground bg-muted"
                  )}
                />
                <span className={cn(
                  "font-pixel text-sm sm:text-base",
                  filter === item.status ? "text-foreground" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {mounted &&
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
          </div>
        </div>
      </main>
    </SharedLayout>
  );
}
