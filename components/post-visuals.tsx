"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

export function formatPostDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      style={{ width: 32, height: 32, flex: "0 0 32px" }}
      className="self-center rounded-full bg-elevated border border-border inline-flex items-center justify-center font-mono text-[10px] text-muted-foreground"
    >
      {initials}
    </span>
  );
}

/** Post visual: real image when present, designed placeholder until generated. */
export function PostImage({ post, className }: { post: BlogPost; className?: string }) {
  if (post.image) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg", className)}>
        <img
          src={post.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }
  const Icon = post.icon;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-elevated border border-border grid-dots flex items-center justify-center",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <Icon className="w-10 h-10 text-primary/70 relative" strokeWidth={1.5} />
    </div>
  );
}

/** Horizontal editorial article card — shared by the blog index and the home strip. */
export function ArticleCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-xl border border-white/10 bg-[#101216] p-5 sm:p-6 pixel-card hover:border-primary/40 hover:bg-elevated shadow-sm"
    >
      <div className="flex flex-col-reverse sm:flex-row gap-5 items-stretch">
        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <Badge
            variant="outline"
            className="w-fit font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-normal mb-3"
          >
            {post.category}
          </Badge>
          <h3 className="font-display font-semibold tracking-tight text-lg sm:text-xl text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {post.description}
          </p>
          <div className="mt-auto flex items-center gap-3">
            <AuthorAvatar name={post.authors[0]?.name ?? "Pixl"} />
            <div className="min-w-0">
              <p className="text-sm text-foreground font-medium truncate">
                {post.authors[0]?.name}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {formatPostDate(post.date, locale)} · {post.readTime}
              </p>
            </div>
          </div>
        </div>
        {/* Visual */}
        <PostImage
          post={post}
          className="w-full sm:w-44 md:w-52 aspect-[16/9] sm:aspect-auto sm:self-stretch sm:min-h-[136px] shrink-0"
        />
      </div>
    </Link>
  );
}
