"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
      <footer className="border-t border-border px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Company */}
            <div>
              <Link href="/" className="inline-flex items-center gap-3 mb-4">
                <img src="/logo.svg" alt="Pixl" className="h-5 sm:h-6 w-auto" />
              </Link>
              <p className="text-sm text-muted-foreground">
                {t("footer.company")}
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">{t("footer.productsTitle")}</h4>
              <div className="flex flex-col gap-2.5 text-sm">
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

            {/* Contact */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">{t("footer.contactTitle")}</h4>
              <div className="flex flex-col gap-2.5 text-sm">
                <a
                  href="mailto:hello@pixldev.be"
                  className="pixel-link text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@pixldev.be
                </a>
                <a
                  href="tel:+32488203567"
                  className="pixel-link text-muted-foreground hover:text-foreground transition-colors"
                >
                  +32 488 20 35 67
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">{t("footer.connectTitle")}</h4>
              <div className="flex flex-col gap-2.5 text-sm">
                <Link
                  href="/blog"
                  className="pixel-link text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("blog.footerLink")}
                </Link>
                <a
                  href="https://www.linkedin.com/company/pixl-srl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-link text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.linkedin")}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
              <a href="/feed.xml" className="text-muted-foreground/70 hover:text-foreground transition-colors">
                feed.xml
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
