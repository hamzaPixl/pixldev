"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getVisibleProductsStatic } from "@/lib/products";
import { getAllBlogPosts } from "@/lib/blog";
import { PostImage } from "@/components/post-visuals";
import { cn } from "@/lib/utils";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";
import { HomePageStructuredData } from "@/components/structured-data";

type FilterType = "all" | "live" | "coming-soon" | "planned";

const dateLocaleMap = { en: "en-US", fr: "fr-BE", nl: "nl-BE" } as const;

export default function Home() {
  const products = getVisibleProductsStatic();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const { t, currentLanguage } = useLanguage();
  const latestPosts = getAllBlogPosts(currentLanguage).slice(0, 3);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = products.filter((product) => {
    if (product.status === "contact") return true;
    if (filter === "all") return true;
    return product.status === filter;
  });

  const filters: { status: FilterType; label: string; dot: string }[] = [
    { status: "all", label: t("filters.all"), dot: "bg-foreground/60" },
    { status: "live", label: t("filters.online"), dot: "bg-primary" },
    { status: "coming-soon", label: t("filters.comingSoon"), dot: "bg-gold" },
    { status: "planned", label: t("filters.planned"), dot: "bg-muted-foreground/50" },
  ];

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
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
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
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="eyebrow mb-3">{t("home.modulesTitle")}</div>
              <div className="flex items-center gap-5 font-mono text-xs text-muted-foreground">
                <span>
                  <span className="text-primary font-medium">
                    {products.filter((p) => p.status === "live").length}
                  </span>{" "}
                  {t("home.stats.online")}
                </span>
                <span>
                  <span className="text-gold font-medium">
                    {products.filter((p) => p.status === "coming-soon").length}
                  </span>{" "}
                  {t("home.stats.coming")}
                </span>
                <span>
                  <span className="text-foreground/70 font-medium">
                    {products.filter((p) => p.status === "planned").length}
                  </span>{" "}
                  {t("home.stats.planned")}
                </span>
              </div>
            </div>

            {/* Filter */}
            <div className="inline-flex items-center gap-1 p-1 rounded-md border border-border bg-card w-fit">
              {filters.map((item) => (
                <button
                  key={item.status}
                  onClick={() => setFilter(item.status)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer",
                    filter === item.status
                      ? "bg-elevated text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", item.dot)} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mounted &&
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestPosts.map((post) => {
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-card border border-border rounded-lg p-5 pixel-card hover:border-primary/40 hover:bg-elevated"
                >
                  <PostImage post={post} className="aspect-[16/9] w-full mb-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-display text-base font-semibold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.description}
                  </p>
                  <div className="mt-auto font-mono text-xs text-muted-foreground/70">
                    {new Date(post.date).toLocaleDateString(dateLocaleMap[currentLanguage], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <span className="mx-2">·</span>
                    {post.readTime}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
