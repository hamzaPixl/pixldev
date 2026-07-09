import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { BASE_URL, absoluteUrl, ogImageUrl, organizationSchema } from "@/lib/seo";
import { BlogIndexClient } from "./client";

const title = "Blog — AI systems, agents, and building in public";
const description =
  "Essays and experiment logs from Pixl: AI systems over models, multi-agent pipelines, AI video generation, and honest build-in-public notes from Belgium.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url: absoluteUrl("/blog"),
    siteName: "Pixl",
    title,
    description,
    images: [{ url: ogImageUrl("The Pixl Blog"), width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImageUrl("The Pixl Blog")],
  },
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: "Pixl Blog",
    description,
    url: absoluteUrl("/blog"),
    inLanguage: ["en", "fr", "nl"],
    publisher: { "@id": `${BASE_URL}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <BlogIndexClient />
    </>
  );
}
