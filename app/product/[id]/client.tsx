"use client";

import { notFound } from "next/navigation";
import { productsStatic } from "@/lib/products";
import { ProductPageLayout } from "@/components/product-page-layout";
import { ProductContent } from "@/components/product-content";

interface ProductPageClientProps {
  productId: string;
}

export function ProductPageClient({ productId }: ProductPageClientProps) {
  const product = productsStatic.find((p) => p.id === productId);

  if (!product || product.status === "hidden") {
    notFound();
  }

  return (
    <ProductPageLayout product={product}>
      <ProductContent productId={productId} />
    </ProductPageLayout>
  );
}
