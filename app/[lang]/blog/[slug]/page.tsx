import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { ORGANIZATION_ID, absoluteUrl, ogImageUrl, organizationSchema, localeAlternates, type Locale } from "@/lib/seo";
import { BlogPostClient } from "@/app/blog/[slug]/client";

const PREFIXED: Locale[] = ["fr", "nl"];

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return PREFIXED.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const post = getBlogPost(slug, locale);
  if (!post) return { title: "Post not found" };

  const localizedPath = `/${locale}/blog/${post.slug}`;
  const ogImage = ogImageUrl(post.title, { eyebrow: post.category, image: post.image });
  const description =
    post.description.length > 160
      ? `${post.description.slice(0, 157).replace(/\s+\S*$/, "")}…`
      : post.description;

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      url: absoluteUrl(localizedPath),
      siteName: "Pixl",
      title: post.title,
      description,
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [ogImage] },
    alternates: localeAlternates(`/blog/${post.slug}`, locale),
  };
}

export default async function LangBlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const post = getBlogPost(slug, locale);
  if (!post) notFound();

  const url = absoluteUrl(`/${locale}/blog/${post.slug}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    image: post.image
      ? absoluteUrl(post.image)
      : absoluteUrl(ogImageUrl(post.title, { eyebrow: post.category })),
    author: post.authors.map((a) => ({ "@type": "Person", name: a.name, sameAs: a.linkedin })),
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <BlogPostClient slug={slug} />
    </>
  );
}
