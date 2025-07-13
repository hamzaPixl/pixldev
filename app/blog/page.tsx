import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import BlogList from "@/components/blog-list";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog | Pixl",
  description:
    "Insights, tutorials, and thoughts on modern web development and technology.",
  openGraph: {
    title: "Blog | Pixl",
    description:
      "Insights, tutorials, and thoughts on modern web development and technology.",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

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
