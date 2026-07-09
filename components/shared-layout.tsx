"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail, Phone, Rss } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { getVisibleProductsStatic, getProductTranslationKey } from "@/lib/products";
import { cn } from "@/lib/utils";

interface SharedLayoutProps {
  children: React.ReactNode;
  showEcosystemLabel?: boolean;
}

export function SharedLayout({ children }: SharedLayoutProps) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const products = getVisibleProductsStatic().filter((p) => p.status !== "contact");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Floating island navbar */}
      <header className="sticky top-3 sm:top-4 z-40 px-3 sm:px-4">
        <div
          className={cn(
            "relative max-w-4xl mx-auto flex items-center justify-between gap-3 h-12 sm:h-[52px] px-3 sm:px-4 rounded-2xl border",
            "backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/55 bg-background/85",
            "shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]",
            "transition-all duration-300",
            scrolled ? "border-white/10" : "border-white/[0.06]"
          )}
        >
          {/* Left: logo */}
          <Link href="/" className="flex items-center pl-1 shrink-0">
            <img src="/logo.svg" alt="Pixl" className="h-5 w-auto" />
          </Link>

          {/* Right: language + CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher variant="dark" />
            <Button asChild size="sm" className="rounded-lg">
              <a href="mailto:hello@pixldev.be">{t("common.buildWithUs")}</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="main" className="flex-1">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Top: wordmark + status/clock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-14">
            <div>
              <Link href="/" className="inline-block">
                <img src="/logo.svg" alt="Pixl" className="h-14 sm:h-20 w-auto" />
              </Link>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-sm">
                {t("footer.company")}
              </p>
            </div>
            <div className="lg:text-right">
              <p className="text-lg sm:text-xl text-foreground/90 leading-snug max-w-md lg:ml-auto">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3 align-middle" />
                {t("footer.status")}
              </p>
              <div className="mt-6">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground mb-1">
                  {t("footer.clock")} (CET)
                </p>
                <BrusselsClock />
              </div>
            </div>
          </div>

          {/* Middle: links + cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8 content-start">
              <div className="flex flex-col gap-3 text-sm">
                <Link href="/" className="pixel-link text-muted-foreground hover:text-foreground transition-colors">
                  {t("blog.home")}
                </Link>
                <Link href="/#modules" className="pixel-link text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.productsTitle")}
                </Link>
                <Link href="/blog" className="pixel-link text-muted-foreground hover:text-foreground transition-colors">
                  {t("blog.footerLink")}
                </Link>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                {products.map((product) => {
                  const translationKey = getProductTranslationKey(product.id);
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="pixel-link text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t(`${translationKey}.name`)}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stay in the loop */}
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col">
                <h4 className="font-display font-semibold tracking-tight text-lg text-foreground mb-2">
                  {t("footer.stayTitle")}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {t("footer.stayText")}
                </p>
                <a
                  href="/feed.xml"
                  className="mt-auto inline-flex items-center justify-between gap-2 border-t border-border pt-3 text-sm text-primary font-medium group"
                >
                  {t("footer.subscribe")}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Contact rows */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
                <a
                  href="https://www.linkedin.com/company/pixl-srl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-foreground hover:bg-elevated transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                  {t("footer.linkedin")}
                </a>
                <a
                  href="mailto:hello@pixldev.be"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-foreground hover:bg-elevated transition-colors"
                >
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  hello@pixldev.be
                </a>
                <a
                  href="tel:+32488203567"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-foreground hover:bg-elevated transition-colors"
                >
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  +32 488 20 35 67
                </a>
                <a
                  href="/feed.xml"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-foreground hover:bg-elevated transition-colors"
                >
                  <Rss className="w-4 h-4 text-muted-foreground" />
                  RSS
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-mono text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} Pixl SRL ·{" "}
              <a
                href="https://www.feen.be/company-lookup?vat=BE0805449693"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                BE 0805.449.693
              </a>{" "}
              · Belgium
            </p>
            <div className="flex items-center gap-4 font-mono text-xs">
              <a href="/sitemap.xml" className="text-muted-foreground/70 hover:text-foreground transition-colors">
                sitemap.xml
              </a>
              <a href="/llms.txt" className="text-muted-foreground/70 hover:text-foreground transition-colors">
                llms.txt
              </a>
              <a href="/brand.md" className="text-muted-foreground/70 hover:text-foreground transition-colors">
                brand.md
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BrusselsClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Brussels",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="font-mono text-4xl sm:text-5xl font-medium text-foreground tabular-nums">
      {time ?? "--:--:--"}
    </p>
  );
}
