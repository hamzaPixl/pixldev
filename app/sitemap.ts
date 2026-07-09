import { MetadataRoute } from "next";
import { getVisibleProductsStatic } from "@/lib/products";
import { getAllBlogPosts } from "@/lib/blog";
import { localeUrls } from "@/lib/seo";

// Static reference date for evergreen pages — updated on meaningful releases.
// Never use `new Date()` here: it invalidates caches on every build.
const SITE_UPDATED = new Date("2026-07-09");

/** Emit one entry per locale for an English path, each with hreflang alternates. */
function localizedEntries(
  path: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  const urls = localeUrls(path);
  const languages = { ...urls, "x-default": urls.en };
  return [urls.en, urls.fr, urls.nl].map((url) => ({
    url,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getVisibleProductsStatic();
  const posts = getAllBlogPosts();
  const blogUpdated = posts.length ? new Date(posts[0].date) : SITE_UPDATED;

  return [
    ...localizedEntries("/", SITE_UPDATED, "weekly", 1),
    ...localizedEntries("/blog", blogUpdated, "weekly", 0.9),
    ...posts.flatMap((post) =>
      localizedEntries(`/blog/${post.slug}`, new Date(post.date), "yearly", 0.7),
    ),
    ...products
      .filter((p) => p.status !== "contact")
      .flatMap((product) =>
        localizedEntries(
          `/product/${product.id}`,
          SITE_UPDATED,
          "monthly",
          product.status === "live" ? 0.8 : 0.6,
        ),
      ),
  ];
}
