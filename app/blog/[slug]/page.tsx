"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { ContentItem } from "@/lib/content";
import { BlogContent } from "@/components/blog-content";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { useLanguage } from "@/lib/language-context";

export default function BlogPostPage() {
  const params = useParams();
  const { currentLanguage, isInitialized } = useLanguage();
  const [blogPost, setBlogPost] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  const slug = params.slug as string;

  useEffect(() => {
    if (!isInitialized) return;

    const loadBlogPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/blog/${slug}?lang=${currentLanguage}`
        );
        if (response.ok) {
          const post = await response.json();
          setBlogPost(post);
          setNotFoundError(false);
        } else {
          setNotFoundError(true);
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
        setNotFoundError(true);
      }
      setLoading(false);
    };

    loadBlogPost();
  }, [slug, currentLanguage, isInitialized]);

  if (!isInitialized || loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 xs:pt-20 sm:pt-24">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  if (notFoundError) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        {blogPost && <BlogContent blogPost={blogPost} />}
        <Footer />
      </main>
    </>
  );
}
