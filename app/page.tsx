"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { ProductBento } from "@/components/product-bento";
import { Button } from "@/components/ui/button";
import { getVisibleProductsStatic } from "@/lib/products";
import { getAllBlogPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/post-visuals";
import { HeroBackground } from "@/components/hero-background";
import { Reveal } from "@/components/reveal";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";
import { HomePageStructuredData } from "@/components/structured-data";

const dateLocaleMap = { en: "en-US", fr: "fr-BE", nl: "nl-BE" } as const;

export default function Home() {
  const products = getVisibleProductsStatic();
  const { t, currentLanguage } = useLanguage();
  const latestPosts = getAllBlogPosts(currentLanguage).slice(0, 3);

  return (
    <SharedLayout>
      <HomePageStructuredData />

      {/* Hero */}
      <section className="relative isolate overflow-hidden -mt-[60px] sm:-mt-[68px] min-h-[100svh] flex flex-col">
        <HeroBackground />

        <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Announcement badge — latest post */}
            {latestPosts[0] && (
              <Link
                href={`/blog/${latestPosts[0].slug}`}
                className="inline-flex items-center gap-3 rounded-full bg-white/10 pl-1.5 pr-4 py-1.5 ring-1 ring-white/15 backdrop-blur-md mb-8 animate-fade-in opacity-0 hover:bg-white/15 transition-colors"
                style={{ animationDelay: "0ms" }}
              >
                <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-primary-foreground font-medium">
                  New
                </span>
                <span className="text-sm text-white/90 truncate max-w-[240px] sm:max-w-md">
                  {latestPosts[0].title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-white/60 shrink-0" />
              </Link>
            )}

            <h1 className="font-display font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.06] mb-6 [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]">
              <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: "100ms" }}>
                {t("home.heroTitle1")}
              </span>
              <br />
              <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: "220ms" }}>
                {t("home.heroTitle2")}
                <span className="animate-blink ml-1.5 font-mono font-normal text-primary">_</span>
              </span>
            </h1>

            <p
              className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in opacity-0 [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]"
              style={{ animationDelay: "340ms" }}
            >
              {t("home.heroSubtitle")}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 items-center justify-center animate-fade-in opacity-0"
              style={{ animationDelay: "460ms" }}
            >
              <Button asChild size="lg" className="rounded-full px-6">
                <a href="mailto:hello@pixldev.be">
                  {t("common.buildWithUs")}
                  <ArrowRight />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-6 bg-white/5 border-white/15 backdrop-blur-md hover:bg-white/10 text-white"
              >
                <a href="https://feen.be" target="_blank" rel="noopener noreferrer">
                  {t("common.tryFeen")}
                  <ExternalLink className="text-white/60" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <main id="modules" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="eyebrow mb-8">{t("home.modulesTitle")}</Reveal>
          <Reveal delay={80}>
            <ProductBento products={products} />
          </Reveal>
        </div>
      </main>

      {/* From the blog */}
      <section className="border-t border-border px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left: heading */}
          <Reveal className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="eyebrow mb-4">{t("blog.title")}</div>
              <p className="text-lg text-muted-foreground leading-snug mb-5 max-w-xs">
                {t("blog.subtitle")}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
              >
                {t("blog.allPosts")}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>

          {/* Right: article cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {latestPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 90}>
                <ArticleCard post={post} locale={dateLocaleMap[currentLanguage]} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
