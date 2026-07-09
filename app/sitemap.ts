import { MetadataRoute } from "next";
import { getVisibleProductsStatic } from "@/lib/products";
import { getAllBlogPosts } from "@/lib/blog";
import { BASE_URL } from "@/lib/seo";

// Static reference date for evergreen pages — updated on meaningful releases.
// Never use `new Date()` here: it invalidates caches on every build.
const SITE_UPDATED = new Date("2026-07-09");

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getVisibleProductsStatic();
  const posts = getAllBlogPosts();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: posts.length ? new Date(posts[0].date) : SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products
    .filter((p) => p.status !== "contact")
    .map((product) => ({
      url: `${BASE_URL}/product/${product.id}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: product.status === "live" ? 0.8 : 0.6,
    }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...productPages];
}
