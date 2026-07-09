"use client";

import { LocaleLink as Link } from "@/components/locale-link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";
import { getAllBlogPosts } from "@/lib/blog";
import { ArticleCard, AuthorAvatar, PostImage, formatPostDate } from "@/components/post-visuals";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const dateLocaleMap = { en: "en-US", fr: "fr-BE", nl: "nl-BE" } as const;

export function BlogIndexClient() {
  const { t, currentLanguage } = useLanguage();
  const posts = getAllBlogPosts(currentLanguage);
  const locale = dateLocaleMap[currentLanguage];
  const [featured, ...rest] = posts;

  return (
    <SharedLayout>
      {/* Header */}
      <section className="border-b border-border px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            {t("common.backToEcosystem")}
          </Link>
          <h1 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl text-foreground mb-2">
            {t("blog.title")}
            <span className="animate-blink ml-1.5 font-mono font-normal">_</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            {t("blog.subtitle")}
          </p>
        </div>
      </section>

      {/* Posts */}
      <main className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {t("blog.noPosts")}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5 items-start">
              {/* Featured post */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group lg:col-span-2 flex flex-col rounded-xl border border-border bg-gradient-to-b from-primary/15 via-card to-card p-6 sm:p-8 pixel-card hover:border-primary/40"
                >
                  <span className="eyebrow mb-5">{featured.category}</span>
                  <h2 className="font-display font-semibold tracking-tight text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                    {featured.description}
                  </p>
                  <span className={cn(buttonVariants({ variant: "outline" }), "w-fit mb-8 bg-background/50")}>
                    {t("blog.readPost")}
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <PostImage post={featured} className="mt-auto aspect-[4/3] w-full" />
                  <div className="flex items-center gap-3 mt-5">
                    <AuthorAvatar name={featured.authors[0]?.name ?? "Pixl"} />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground font-medium truncate">
                        {featured.authors[0]?.name}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {formatPostDate(featured.date, locale)} · {featured.readTime}
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              {/* Article list */}
              <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-5">
                {rest.map((post, i) => (
                  <Reveal key={post.slug} delay={i * 70}>
                    <ArticleCard post={post} locale={locale} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </SharedLayout>
  );
}
