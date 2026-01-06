import { MetadataRoute } from "next";
import { getVisibleProductsStatic } from "@/lib/products";

const baseUrl = "https://pixldev.be";
const languages = ["en", "fr", "nl"];

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getVisibleProductsStatic();

  // Base pages with language alternates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(languages.map((lang) => [lang, baseUrl])),
      },
    },
  ];

  // Product pages with language alternates
  const productPages: MetadataRoute.Sitemap = products
    .filter((p) => p.status !== "contact") // Exclude contact/custom page from sitemap
    .map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: product.status === "live" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          languages.map((lang) => [lang, `${baseUrl}/product/${product.id}`])
        ),
      },
    }));

  // LLM context file
  const llmPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...productPages, ...llmPages];
}
