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
      <section className="relative border-b border-border px-4 sm:px-6 grid-dots">
        <div className="max-w-6xl mx-auto py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="eyebrow mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0ms" }}>
              Pixl — Belgian AI studio
            </div>
            <h1 className="font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.08] mb-6">
              <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: "80ms" }}>
                {t("home.heroTitle1")}
              </span>
              <br />
              <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: "200ms" }}>
                <span className="text-primary">{t("home.heroTitle2")}</span>
                <span className="animate-blink ml-1.5 font-mono font-normal">_</span>
              </span>
            </h1>
            <p
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10 animate-fade-in opacity-0"
              style={{ animationDelay: "320ms" }}
            >
              {t("home.heroSubtitle")}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 animate-fade-in opacity-0"
              style={{ animationDelay: "420ms" }}
            >
              <Button asChild size="lg">
                <a href="mailto:hello@pixldev.be">
                  {t("common.buildWithUs")}
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
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
