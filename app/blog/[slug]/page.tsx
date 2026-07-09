import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { BASE_URL, ORGANIZATION_ID, absoluteUrl, ogImageUrl, organizationSchema } from "@/lib/seo";
import { BlogPostClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const url = absoluteUrl(`/blog/${post.slug}`);
  const ogImage = ogImageUrl(post.title);
  // SERP truncates around 160 chars — cut at a word boundary
  const description =
    post.description.length > 160
      ? `${post.description.slice(0, 157).replace(/\s+\S*$/, "")}…`
      : post.description;

  return {
    title: post.title,
    description,
    authors: post.authors.map((a) => ({ name: a.name, url: a.linkedin })),
    openGraph: {
      type: "article",
      url,
      siteName: "Pixl",
      title: post.title,
      description,
      publishedTime: post.date,
      authors: post.authors.map((a) => a.name),
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const url = absoluteUrl(`/blog/${post.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: ["en", "fr", "nl"],
    image: absoluteUrl(ogImageUrl(post.title)),
    author: post.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      sameAs: a.linkedin,
    })),
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <BlogPostClient slug={slug} />
    </>
  );
}
