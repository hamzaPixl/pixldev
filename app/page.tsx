"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { ProductBento } from "@/components/product-bento";
import { Button } from "@/components/ui/button";
import { getVisibleProductsStatic } from "@/lib/products";
import { getAllBlogPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/post-visuals";
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
        <img
          src="/hero-horizon.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Readability + blend overlays */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

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
                <span className="text-sm text-foreground/90 truncate max-w-[240px] sm:max-w-md">
                  {latestPosts[0].title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </Link>
            )}

            <h1 className="font-display font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.06] mb-6">
              <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: "100ms" }}>
                {t("home.heroTitle1")}
              </span>
              <br />
              <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: "220ms" }}>
                <span className="text-primary">{t("home.heroTitle2")}</span>
                <span className="animate-blink ml-1.5 font-mono font-normal">_</span>
              </span>
            </h1>

            <p
              className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in opacity-0"
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
                className="rounded-full px-6 bg-white/5 border-white/15 backdrop-blur-md hover:bg-white/10"
              >
                <a href="https://feen.be" target="_blank" rel="noopener noreferrer">
                  {t("common.tryFeen")}
                  <ExternalLink className="text-muted-foreground" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <main id="modules" className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="eyebrow mb-8">{t("home.modulesTitle")}</div>
          <ProductBento products={products} />
        </div>
      </main>

      {/* From the blog */}
      <section className="border-t border-border px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div className="eyebrow">{t("blog.title")}</div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("blog.allPosts")}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} locale={dateLocaleMap[currentLanguage]} />
            ))}
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
