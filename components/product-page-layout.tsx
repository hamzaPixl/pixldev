"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, MessageCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductStatic } from "@/lib/products";
import { getProductTranslationKey } from "@/lib/products";
import { getProductBrand } from "@/lib/product-brand";
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
  const b = getProductBrand(product.id);

  return (
    <SharedLayout>
      <ProductPageStructuredData
        productId={product.id}
        productName={productName}
        description={productDescription}
        url={product.url}
      />
      {/* Banner */}
      <section className={cn("px-4 sm:px-6 py-10 sm:py-14 border-b border-border bg-gradient-to-br", b.gradient)}>
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
                "w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center border shrink-0",
                b.tile
              )}
            >
              {product.logo ? (
                <img src={product.logo} alt={productName} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
              ) : (
                <Icon className={cn("w-8 h-8 sm:w-10 sm:h-10", b.accentText)} />
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl text-foreground">{productName}</h1>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.12em] px-2 py-1 rounded border",
                    isLive && "text-primary border-primary/30 bg-primary/10",
                    product.status === "coming-soon" && "text-gold border-gold/30 bg-gold/10",
                    product.status === "planned" && "text-muted-foreground border-border bg-muted",
                    isContact && "text-gold border-gold/30 bg-gold/10"
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isLive && "bg-primary",
                      (product.status === "coming-soon" || isContact) && "bg-gold",
                      product.status === "planned" && "bg-muted-foreground/50"
                    )}
                  />
                  {statusLabel}
                </span>
              </div>

              <p className={cn("text-base md:text-lg font-medium mb-3", b.accentText)}>{productTagline}</p>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">{productDescription}</p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {isLive && product.url && (
                  <Button onClick={() => window.open(product.url, "_blank")}>
                    <ExternalLink />
                    {t("common.launchProduct")} {productName}
                  </Button>
                )}
                {isContact && (
                  <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
                    <a href="mailto:hello@pixldev.be">
                      <MessageCircle />
                      {t("common.contactUs")}
                    </a>
                  </Button>
                )}
                {(product.status === "coming-soon" || product.status === "planned") && (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-muted text-muted-foreground text-sm">
                    <Lock className="w-4 h-4" />
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
          <ProductFaq productId={product.id} accentText={b.accentText} />
        </div>
      </main>
    </SharedLayout>
  );
}

function ProductFaq({ productId, accentText }: { productId: string; accentText: string }) {
  const { t, tObject } = useLanguage();
  const faq = tObject<{ q: string; a: string }[]>(`productFaq.${productId}`);
  if (!faq?.length) return null;

  return (
    <section className="mt-12 sm:mt-16">
      <h2 className="font-display font-semibold tracking-tight text-xl sm:text-2xl text-foreground mb-6 flex items-center gap-3">
        <span className={cn("w-2 h-2 rounded-sm bg-current shrink-0", accentText)} />
        {t("productFaq.title")}
      </h2>
      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        {faq.map((item, i) => (
          <details key={i} className="group bg-card open:bg-elevated">
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-foreground font-medium text-sm sm:text-base [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="text-muted-foreground transition-transform duration-200 group-open:rotate-45 shrink-0 text-lg leading-none">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 -mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
