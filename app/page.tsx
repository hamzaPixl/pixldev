import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import WhatWeBuild from "@/components/what-we-build";
import KeyBenefits from "@/components/key-benefits";
import CTACard from "@/components/cta-card";
import CaseStudies from "@/components/case-studies";
import BlogCarousel from "@/components/blog-carousel";
import FaqSection from "@/components/faq-section";
import AboutSection from "@/components/about-section";
import { getAllBlogPosts } from "@/lib/content";

export default async function Home() {
  // Fetch blog posts for the carousel
  const blogPosts = await getAllBlogPosts();

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Hero />
        <AboutSection />
        <KeyBenefits />
        <WhatWeBuild />
        <CaseStudies />
        <BlogCarousel posts={blogPosts} />
        <FaqSection />
        <CTACard />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
