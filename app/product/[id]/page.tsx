import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsStatic, getVisibleProductsStatic, getProductTranslationKey } from "@/lib/products";
import { en } from "@/lib/translations/en";
import { ProductPageClient } from "./client";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Helper to get nested translation value
function getTranslation(key: string): string {
  const keys = key.split(".");
  let value: unknown = en;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === "string" ? value : key;
}

// Helper to get SEO data from translations
function getProductSeo(productId: string): { title: string; description: string; keywords: string[] } {
  const translationKey = getProductTranslationKey(productId);
  if (!translationKey) {
    return {
      title: "Product Not Found",
      description: "",
      keywords: [],
    };
  }

  const keys = translationKey.split(".");
  let product: unknown = en;
  for (const k of keys) {
    if (product && typeof product === "object" && k in product) {
      product = (product as Record<string, unknown>)[k];
    }
  }

  if (product && typeof product === "object" && "seo" in product) {
    const seo = (product as { seo: { title: string; description: string; keywords: string[] } }).seo;
    return seo;
  }

  // Fallback to name + tagline + description
  const name = getTranslation(`${translationKey}.name`);
  const tagline = getTranslation(`${translationKey}.tagline`);
  const description = getTranslation(`${translationKey}.description`);

  return {
    title: `${name} — ${tagline}`,
    description,
    keywords: ["Pixl", "business tools"],
  };
}

// Generate static params for all visible products
export async function generateStaticParams() {
  const visibleProducts = getVisibleProductsStatic();
  return visibleProducts.map((product) => ({
    id: product.id,
  }));
}

// Generate metadata for each product page
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = productsStatic.find((p) => p.id === id);

  if (!product || product.status === "hidden") {
    return {
      title: "Product Not Found",
    };
  }

  const baseUrl = "https://pixldev.be";
  const productSeo = getProductSeo(id);

  return {
    title: productSeo.title,
    description: productSeo.description,
    keywords: productSeo.keywords,
    openGraph: {
      title: productSeo.title,
      description: productSeo.description,
      url: `${baseUrl}/product/${id}`,
      siteName: "Pixl Ecosystem",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1536,
          height: 1024,
          alt: productSeo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productSeo.title,
      description: productSeo.description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `${baseUrl}/product/${id}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = productsStatic.find((p) => p.id === id);

  if (!product || product.status === "hidden") {
    notFound();
  }

  return <ProductPageClient productId={id} />;
}
