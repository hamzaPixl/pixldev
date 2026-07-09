"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SharedLayout } from "@/components/shared-layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <SharedLayout>
      <section className="relative isolate overflow-hidden min-h-[70svh] flex items-center justify-center px-4 sm:px-6 py-24 grid-dots">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_45%,rgba(48,203,119,0.06),transparent_70%)]" />
        <div className="relative max-w-xl mx-auto text-center">
          <div className="eyebrow justify-center mb-6">404</div>
          <h1 className="font-display font-semibold tracking-tight text-5xl sm:text-6xl md:text-7xl text-foreground mb-5">
            <span className="text-muted-foreground/60 font-mono text-2xl sm:text-3xl align-middle mr-2">
              {">"}
            </span>
            {t("notFound.title")}
            <span className="animate-blink ml-1.5 font-mono font-normal text-primary">_</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
            {t("notFound.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/">
                <ArrowLeft />
                {t("blog.home")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link href="/blog">
                {t("blog.footerLink")}
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
