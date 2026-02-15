"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock, ArrowLeft } from "lucide-react";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";
import { getAllBlogPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

const dateLocaleMap = { en: "en-US", fr: "fr-FR", nl: "nl-NL" } as const;

export default function BlogPage() {
  const { t, currentLanguage } = useLanguage();
  const posts = getAllBlogPosts(currentLanguage);

  return (
    <SharedLayout>
      {/* Header */}
      <section className="border-b border-border px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            {t("common.backToEcosystem")}
          </Link>

          <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">
            <span className="text-muted-foreground mr-2">{">"}</span>
            {t("blog.title")}
            <span className="animate-blink ml-1">_</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            {t("blog.subtitle")}
          </p>
        </div>
      </section>

      {/* Posts */}
      <main className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              {t("blog.noPosts")}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => {
                const Icon = post.icon;
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article
                      className={cn(
                        "group border-2 border-border bg-card p-5 sm:p-6 transition-all cursor-pointer",
                        "hover:border-primary/50 hover:translate-y-[-2px]",
                        "pixel-card"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex gap-4 sm:gap-5 items-start">
                        {/* Icon */}
                        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 border-2 border-border bg-background flex items-center justify-center group-hover:border-primary/40 transition-colors">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2 py-0.5 border text-primary border-primary/30 bg-primary/10">
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString(dateLocaleMap[currentLanguage], {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>

                          <h2 className="font-pixel text-lg sm:text-xl text-foreground mb-1.5 group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>

                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {post.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] sm:text-xs text-muted-foreground border border-border px-1.5 py-0.5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="shrink-0 hidden sm:flex items-center self-center">
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </SharedLayout>
  );
}
