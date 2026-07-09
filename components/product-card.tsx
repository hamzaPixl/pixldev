"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";
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
  const statusDot =
    product.status === "live"
      ? "bg-primary"
      : product.status === "coming-soon" || product.status === "contact"
      ? "bg-gold"
      : "bg-muted-foreground/50";

  const isGold = product.featured;
  const isHidden = product.status === "hidden";

  return (
    <Link
      href={`/product/${product.id}`}
      style={{ animationDelay: `${index * 60}ms` }}
      className={cn(
        "group relative flex flex-col bg-card border border-border rounded-lg p-5 pixel-card opacity-0 animate-fade-in",
        "hover:border-primary/40 hover:bg-elevated",
        isGold && "border-gold/30 hover:border-gold/50",
        isHidden && "opacity-50",
        product.status === "contact" && "border-dashed"
      )}
    >
      {/* Featured badge */}
      {isGold && (
        <div className="absolute top-4 right-4">
          <Sparkles className="w-4 h-4 text-gold/80" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3.5 mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-md flex items-center justify-center bg-elevated border border-border shrink-0",
            isGold && "bg-gold/10 border-gold/20"
          )}
        >
          {product.logo ? (
            <img src={product.logo} alt="" className="w-6 h-6 object-contain" />
          ) : (
            <Icon
              className={cn(
                "w-5 h-5 text-primary",
                isGold && "text-gold",
                isHidden && "text-muted-foreground"
              )}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-display text-base sm:text-lg font-semibold tracking-tight mb-0.5",
              isHidden ? "text-muted-foreground" : "text-foreground"
            )}
          >
            {productName}
          </h3>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            <span className={cn("w-1.5 h-1.5 rounded-full", statusDot)} />
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm text-muted-foreground mb-3">{productTagline}</p>

      {/* Description */}
      <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-5">
        {productDescription}
      </p>

      {/* Action */}
      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between text-sm">
        {product.status === "live" && product.url ? (
          <span className="inline-flex items-center gap-1.5 text-primary font-medium">
            {t("common.launchProduct")}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : product.status === "contact" ? (
          <span className="inline-flex items-center gap-1.5 text-gold font-medium">
            <MessageCircle className="w-3.5 h-3.5" />
            {t("common.contactUs")}
          </span>
        ) : (
          <span className="text-muted-foreground/70">{t("common.notAvailable")}</span>
        )}
      </div>
    </Link>
  );
}
