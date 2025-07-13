import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogPost, getAllBlogPosts } from "@/lib/content";
import { BlogContent } from "@/components/blog-content";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogPosts = await getAllBlogPosts();
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = await getBlogPost(slug);

  if (!blogPost) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blogPost.frontmatter.title} | Pixl Blog`,
    description: blogPost.frontmatter.description,
    keywords: blogPost.frontmatter.keywords?.join(", "),
    openGraph: {
      title: blogPost.frontmatter.title,
      description: blogPost.frontmatter.description,
      images: blogPost.frontmatter.image ? [blogPost.frontmatter.image] : [],
      type: "article",
      publishedTime: blogPost.frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.frontmatter.title,
      description: blogPost.frontmatter.description,
      images: blogPost.frontmatter.image ? [blogPost.frontmatter.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blogPost = await getBlogPost(slug);

  if (!blogPost) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <BlogContent blogPost={blogPost} />
        <Footer />
      </main>
    </>
  );
}
