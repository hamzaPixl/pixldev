"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, MessageCircle, Lock } from "lucide-react";
import type { ProductStatic } from "@/lib/products";
import { getProductTranslationKey } from "@/lib/products";
import { cn } from "@/lib/utils";
import { SharedLayout } from "@/components/shared-layout";
import { useLanguage } from "@/lib/language-context";
import { ProductPageStructuredData } from "@/components/structured-data";

interface ProductPageLayoutProps {
  product: ProductStatic;
  children: React.ReactNode;
}

export function ProductPageLayout({ product, children }: ProductPageLayoutProps) {
  const { t } = useLanguage();
  const Icon = product.icon;
  const isLive = product.status === "live";
  const isContact = product.status === "contact";

  const translationKey = getProductTranslationKey(product.id);
  const productName = t(`${translationKey}.name`);
  const productTagline = t(`${translationKey}.tagline`);
  const productDescription = t(`${translationKey}.description`);

  const statusLabel = t(`status.${product.status === "coming-soon" ? "comingSoon" : product.status}`);

  return (
    <SharedLayout>
      <ProductPageStructuredData
        productId={product.id}
        productName={productName}
        description={productDescription}
        url={product.url}
      />
      {/* Banner */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 border-b border-border">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            {t("common.backToEcosystem")}
          </Link>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start">
            {/* Icon/Logo */}
            <div
              className={cn(
                "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-2 border-border bg-card shrink-0",
                product.featured && "border-gold/40"
              )}
            >
              {product.logo ? (
                <img src={product.logo} alt={productName} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
              ) : (
                <Icon className={cn("w-8 h-8 sm:w-10 sm:h-10 text-primary", product.featured && "text-gold")} />
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground">{productName}</h1>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2 py-0.5 sm:py-1 border",
                    isLive && "text-primary border-primary/30 bg-primary/10",
                    product.status === "coming-soon" && "text-gold border-gold/30 bg-gold/10",
                    product.status === "planned" && "text-muted-foreground border-border bg-muted",
                    isContact && "text-gold border-gold/30 bg-gold/10"
                  )}
                >
                  {statusLabel}
                </span>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-primary mb-3 sm:mb-4">{productTagline}</p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{productDescription}</p>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {isLive && product.url && (
                  <button
                    onClick={() => window.open(product.url, "_blank")}
                    className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t("common.launchProduct")} {productName}
                  </button>
                )}
                {isContact && (
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gold text-gold-foreground font-semibold hover:bg-gold/90 transition-colors text-sm sm:text-base"
                  >
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t("common.contactUs")}
                  </button>
                )}
                {(product.status === "coming-soon" || product.status === "planned") && (
                  <div className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-muted text-muted-foreground text-sm sm:text-base">
                    <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t("common.notAvailable")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </SharedLayout>
  );
}
