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

  useEffect(() => {
    if (!isInitialized) return;

    const loadBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/blog?lang=${currentLanguage}`);
        if (response.ok) {
          const posts = await response.json();
          setBlogPosts(posts);
        }
      } catch (error) {
        console.error("Error loading blog posts:", error);
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
            <div className="animate-pulse">Loading...</div>
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
