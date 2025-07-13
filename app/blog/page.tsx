"use client";

import { useState, useEffect } from "react";
import { ContentItem } from "@/lib/content";
import BlogList from "@/components/blog-list";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { useLanguage } from "@/lib/language-context";

export default function BlogPage() {
  const { currentLanguage, isInitialized } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized) return;

    const loadBlogPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching blog posts for language: ${currentLanguage}`);
        const response = await fetch(`/api/blog?lang=${currentLanguage}`);
        console.log(`Blog API response status: ${response.status}`);

        if (response.ok) {
          const posts = await response.json();
          console.log(`Received ${posts.length} blog posts:`, posts);
          setBlogPosts(posts);
        } else {
          const errorText = await response.text();
          console.error(`Blog API error: ${response.status} - ${errorText}`);
          setError(`Failed to load blog posts: ${response.status}`);
        }
      } catch (error) {
        console.error("Error loading blog posts:", error);
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      }
      setLoading(false);
    };

    loadBlogPosts();
  }, [currentLanguage, isInitialized]);

  if (!isInitialized || loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 xs:pt-20 sm:pt-24">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
            <div className="animate-pulse text-muted-foreground">
              Loading blog posts...
            </div>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="pt-16 xs:pt-20 sm:pt-24">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
            <div className="text-red-500">Error: {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-pixl-teal text-black rounded"
            >
              Retry
            </button>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <BlogList posts={blogPosts} />
        <Footer />
      </main>
    </>
  );
}
