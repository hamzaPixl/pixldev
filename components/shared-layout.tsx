"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-context";
import { getVisibleProductsStatic, getProductTranslationKey } from "@/lib/products";

interface SharedLayoutProps {
  children: React.ReactNode;
  showEcosystemLabel?: boolean;
}

export function SharedLayout({ children, showEcosystemLabel = false }: SharedLayoutProps) {
  const { t } = useLanguage();
  const products = getVisibleProductsStatic().filter((p) => p.status !== "contact");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Pixl" className="h-5 sm:h-6 w-auto" />
              {showEcosystemLabel && (
                <span className="hidden sm:inline text-xs text-muted-foreground">{t("common.ecosystem")}</span>
              )}
            </Link>
            <nav className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
              <Link href="/#modules" className="hover:text-foreground transition-colors">
                {t("footer.productsTitle")}
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                {t("blog.footerLink")}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher variant="dark" />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="/#contact">{t("common.buildWithUs")}</a>
            </Button>
            {/* Mobile menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" aria-label="Menu" className="h-8 w-8">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[180px] md:hidden">
                <DropdownMenuItem asChild>
                  <Link href="/#modules">{t("footer.productsTitle")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog">{t("blog.footerLink")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/#contact" className="text-primary">
                    {t("common.buildWithUs")}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="main" className="flex-1">
        {children}
      </div>

      {/* Contact Section */}
      <ContactForm />

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
              <a
                href="https://www.feen.be/company-lookup?vat=BE0805449693"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-link text-xs text-muted-foreground/70 mt-2 hover:text-foreground transition-colors"
              >
                {t("footer.vat")}
              </a>
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
                <a
                  href="/feed.xml"
                  className="pixel-link text-muted-foreground hover:text-foreground transition-colors"
                >
                  RSS
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
