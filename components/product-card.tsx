"use client";

import Link from "next/link";
import { Lock, Sparkles, ExternalLink, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductStatic } from "@/lib/products";
import { getProductTranslationKey } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

interface ProductCardProps {
  product: ProductStatic;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { t } = useLanguage();
  const Icon = product.icon;

  const translationKey = getProductTranslationKey(product.id);
  const productName = t(`${translationKey}.name`);
  const productTagline = t(`${translationKey}.tagline`);
  const productDescription = t(`${translationKey}.description`);

  const statusLabel = t(`status.${product.status === "coming-soon" ? "comingSoon" : product.status}`);
  const statusColor =
    product.status === "live"
      ? "text-primary"
      : product.status === "coming-soon" || product.status === "contact"
      ? "text-gold"
      : "text-muted-foreground";

  const isGold = product.featured;
  const isHidden = product.status === "hidden";

  return (
    <Link
      href={`/product/${product.id}`}
      style={{ animationDelay: `${index * 80}ms` }}
      className={cn(
        "relative bg-card border-2 border-border p-4 sm:p-5 pixel-card opacity-0 animate-fade-in block",
        isGold && "gold-glow border-gold/40",
        isHidden && "opacity-50",
        product.status === "contact" && "border-dashed border-gold/40"
      )}
    >
      {/* Featured badge */}
      {isGold && (
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div
          className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-accent/50 border border-border shrink-0",
            isGold && "bg-gold/10 border-gold/30",
            isHidden && "bg-muted"
          )}
        >
          {product.logo ? (
            <img src={product.logo} alt={productName} className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
          ) : (
            <Icon
              className={cn(
                "w-5 h-5 sm:w-6 sm:h-6 text-primary",
                isGold && "text-gold",
                isHidden && "text-muted-foreground"
              )}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-pixel text-lg sm:text-xl leading-relaxed mb-1",
              isGold ? "text-gold glow-gold" : "text-foreground",
              isHidden && "text-muted-foreground"
            )}
          >
            {productName}
          </h3>
          <span
            className={cn(
              "text-[10px] sm:text-xs font-medium uppercase tracking-wider",
              statusColor
            )}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p
        className={cn(
          "text-sm sm:text-base text-muted-foreground mb-2 sm:mb-3",
          isGold && "text-gold/70",
          isHidden && "text-muted-foreground/60"
        )}
      >
        {productTagline}
      </p>

      {/* Description */}
      <div className="pt-3 sm:pt-4 border-t border-border">
        <p className="text-xs sm:text-sm text-foreground/80 mb-4 sm:mb-5 leading-relaxed line-clamp-3">
          {productDescription}
        </p>

        {/* Actions */}
        <div className="flex gap-2 sm:gap-3">
          {product.status === "live" && product.url && (
            <span className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold">
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              {t("common.launchProduct")}
            </span>
          )}
          {product.status === "contact" && (
            <span className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gold text-gold-foreground text-xs sm:text-sm font-semibold">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              {t("common.contactUs")}
            </span>
          )}
          {(product.status === "coming-soon" || product.status === "planned") && (
            <span className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted text-muted-foreground text-xs sm:text-sm">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
              {t("common.notAvailable")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
