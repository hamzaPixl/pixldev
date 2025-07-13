import { notFound } from "next/navigation";
import {
  getBlogPost,
  getAllBlogPosts,
  SUPPORTED_LANGUAGES,
} from "@/lib/content";
import { BlogContent } from "@/components/blog-content";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import StructuredData from "@/components/structured-data";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = await getBlogPost(slug);

  if (!blogPost) {
    return {
      title: "Blog Post Not Found | Pixl",
      description: "The requested blog post could not be found.",
    };
  }

  const { frontmatter } = blogPost;

  return {
    title: `${frontmatter.title} | Pixl Blog`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    authors: [{ name: "Pixl Team", url: "https://pixldev.be" }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.date,
      images: frontmatter.image
        ? [
            {
              url: frontmatter.image,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ]
        : undefined,
      siteName: "Pixl",
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
    robots: {
      index: frontmatter.published !== false,
      follow: true,
    },
    alternates: {
      canonical: `https://pixldev.be/blog/${slug}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => [
          lang,
          lang === "en"
            ? `https://pixldev.be/blog/${slug}`
            : `https://pixldev.be/${lang}/blog/${slug}`,
        ])
      ),
    },
  };
}

// Generate static params for ISR
export async function generateStaticParams() {
  const blogPosts = await getAllBlogPosts();
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blogPost = await getBlogPost(slug);

  if (!blogPost) {
    notFound();
  }

  return (
    <>
      <StructuredData type="BlogPosting" data={blogPost} />
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <BlogContent blogPost={blogPost} />
        <Footer />
      </main>
    </>
  );
}
