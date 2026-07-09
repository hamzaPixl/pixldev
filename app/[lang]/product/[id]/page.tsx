import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsStatic, getVisibleProductsStatic, getProductTranslationKey } from "@/lib/products";
import { getProductBrand } from "@/lib/product-brand";
import { ogImageUrl, absoluteUrl, localeAlternates, type Locale } from "@/lib/seo";
import { translations } from "@/lib/translations";
import { ProductPageClient } from "@/app/product/[id]/client";

const PREFIXED: Locale[] = ["fr", "nl"];

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export function generateStaticParams() {
  const products = getVisibleProductsStatic();
  return PREFIXED.flatMap((lang) => products.map((p) => ({ lang, id: p.id })));
}

function localizedSeo(id: string, locale: Locale) {
  const key = getProductTranslationKey(id).split(".");
  let node: unknown = translations[locale];
  for (const k of key) {
    if (node && typeof node === "object" && k in node) node = (node as Record<string, unknown>)[k];
  }
  const p = node as {
    name?: string;
    tagline?: string;
    description?: string;
    seo?: { title: string; description: string };
  };
  return {
    name: p?.name ?? "Pixl",
    title: p?.seo?.title ?? `${p?.name} — ${p?.tagline}`,
    description: p?.seo?.description ?? p?.description ?? "",
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const locale = lang as Locale;
  const product = productsStatic.find((p) => p.id === id);
  if (!product || product.status === "hidden") return { title: "Product not found" };

  const seo = localizedSeo(id, locale);
  const og = ogImageUrl(seo.name, { eyebrow: "Product", accent: getProductBrand(id).ogAccent });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: absoluteUrl(`/${locale}/product/${id}`),
      siteName: "Pixl",
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [og] },
    alternates: localeAlternates(`/product/${id}`, locale),
  };
}

export default async function LangProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = productsStatic.find((p) => p.id === id);
  if (!product || product.status === "hidden") notFound();
  return <ProductPageClient productId={id} />;
}
