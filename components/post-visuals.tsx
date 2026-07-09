"use client";

import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

export function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="w-8 h-8 rounded-full bg-elevated border border-border flex items-center justify-center font-mono text-[10px] text-muted-foreground shrink-0">
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
