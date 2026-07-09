"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductStatic } from "@/lib/products";
import { getProductTranslationKey } from "@/lib/products";
import { getProductBrand } from "@/lib/product-brand";
import { useLanguage } from "@/lib/language-context";

/** Illustration slot: real image when provided, quiet branded pattern until then. */
function Illustration({ product, className }: { product: ProductStatic; className?: string }) {
  const Icon = product.icon;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/60 bg-background/40 grid-dots flex items-center justify-center",
        className
      )}
    >
      <Icon className="w-12 h-12 text-foreground/20" strokeWidth={1} />
    </div>
  );
}

export function ProductBento({ products }: { products: ProductStatic[] }) {
  const { t } = useLanguage();

  const byId = Object.fromEntries(products.map((p) => [p.id, p]));
  const feen = byId["feen"];
  const custom = byId["custom"];
  const smalls = products.filter((p) => p.id !== "feen" && p.id !== "custom");

  const name = (p: ProductStatic) => t(`${getProductTranslationKey(p.id)}.name`);
  const tagline = (p: ProductStatic) => t(`${getProductTranslationKey(p.id)}.tagline`);
  const description = (p: ProductStatic) => t(`${getProductTranslationKey(p.id)}.description`);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* Feen — featured brand cell */}
      {feen && (
        <Link
          href="/product/feen"
          className={cn(
            "group relative sm:col-span-2 lg:col-span-4 lg:row-span-2 flex flex-col rounded-xl border border-border p-6 sm:p-8 pixel-card overflow-hidden",
            "bg-gradient-to-br",
            getProductBrand("feen").gradient,
            getProductBrand("feen").hoverBorder
          )}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3.5">
              <div className={cn("w-11 h-11 rounded-lg border flex items-center justify-center", getProductBrand("feen").tile)}>
                <img src="/feen-icon.svg" alt="" className="w-7 h-7 object-contain" />
              </div>
              <h3 className="font-display font-semibold tracking-tight text-xl sm:text-2xl text-foreground">
                {name(feen)}
              </h3>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className={cn("text-base sm:text-lg font-medium mb-2", getProductBrand("feen").accentText)}>
            {tagline(feen)}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mb-6">
            {description(feen)}
          </p>

          {/* Illustration slot — real visual later */}
          <Illustration product={feen} className="mt-auto h-40 sm:h-48" />
        </Link>
      )}

      {/* Module cells */}
      {smalls.map((product) => {
        const b = getProductBrand(product.id);
        const Icon = product.icon;
        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className={cn(
              "group relative lg:col-span-2 flex flex-col rounded-xl border border-border p-5 sm:p-6 pixel-card overflow-hidden",
              "bg-gradient-to-br",
              b.gradient,
              b.hoverBorder
            )}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center", b.tile)}>
                {product.logo ? (
                  <img src={product.logo} alt="" className="w-6 h-6 object-contain" />
                ) : (
                  <Icon className={cn("w-5 h-5", b.accentText)} />
                )}
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <h3 className="font-display font-semibold tracking-tight text-lg text-foreground mb-1">
              {name(product)}
            </h3>
            <p className={cn("text-sm font-medium mb-2", b.accentText)}>{tagline(product)}</p>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {description(product)}
            </p>
          </Link>
        );
      })}

      {/* Custom — full-width quiet CTA bar */}
      {custom && (
        <a
          href="mailto:hello@pixldev.be"
          className="group sm:col-span-2 lg:col-span-6 flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-dashed border-gold/30 bg-card/50 px-5 sm:px-6 py-4 pixel-card hover:border-gold/50"
        >
          <div className="w-10 h-10 rounded-lg border border-gold/25 bg-gold/10 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold tracking-tight text-lg text-foreground">
              {name(custom)}
            </h3>
            <p className="text-sm text-muted-foreground">{description(custom)}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold shrink-0">
            {t("common.contactUs")}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      )}
    </div>
  );
}
