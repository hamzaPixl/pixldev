"use client";

import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { LanguageSwitcher } from "@/components/language-switcher";
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
    <div className="min-h-screen bg-background grid-dots flex flex-col">
      {/* Header */}
      <header className="bg-primary px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Pixl" className="h-6 sm:h-8 w-auto brightness-0" />
            {showEcosystemLabel && (
              <span className="text-xs sm:text-sm text-primary-foreground/70">{t("common.ecosystem")}</span>
            )}
          </Link>
          <LanguageSwitcher variant="dark" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Contact Section */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-primary px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Logo & Company */}
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <img src="/logo.svg" alt="Pixl" className="h-6 sm:h-8 w-auto brightness-0" />
              </Link>
              <p className="text-sm text-primary-foreground/80">
                {t("footer.company")}
              </p>
              <a
                href="https://www.feen.be/company-lookup?vat=BE0805449693"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-link text-xs text-primary-foreground/70 mt-1 hover:text-primary-foreground transition-colors"
              >
                {t("footer.vat")}
              </a>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-pixel text-sm sm:text-base text-primary-foreground mb-4">{t("footer.productsTitle")}</h4>
              <div className="flex flex-col gap-2 text-sm">
                {products.map((product) => {
                  const translationKey = getProductTranslationKey(product.id);
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="pixel-link text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                    >
                      {t(`${translationKey}.name`)}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-pixel text-sm sm:text-base text-primary-foreground mb-4">{t("footer.contactTitle")}</h4>
              <div className="flex flex-col gap-3 text-sm">
                <a
                  href="mailto:hello@pixldev.be"
                  className="pixel-link text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                >
                  hello@pixldev.be
                </a>
                <a
                  href="tel:+32488203567"
                  className="pixel-link text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                >
                  +32 488 20 35 67
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-pixel text-sm sm:text-base text-primary-foreground mb-4">{t("footer.connectTitle")}</h4>
              <div className="flex flex-col gap-3 text-sm">
                <Link
                  href="/blog"
                  className="pixel-link text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                >
                  {t("blog.footerLink")}
                </Link>
                <a
                  href="https://www.linkedin.com/company/pixl-srl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-link text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                >
                  {t("footer.linkedin")}
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
