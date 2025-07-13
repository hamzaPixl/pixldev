"use client";

import { ContentItem } from "@/lib/content";

interface StructuredDataProps {
  type: "BlogPosting" | "Article" | "Organization" | "WebSite";
  data?: ContentItem;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "BlogPosting":
        if (!data) return baseData;
        return {
          ...baseData,
          "@type": "BlogPosting",
          headline: data.frontmatter.title,
          description: data.frontmatter.description,
          image: data.frontmatter.image,
          author: {
            "@type": "Organization",
            name: "Pixl",
            url: "https://pixldev.be",
          },
          publisher: {
            "@type": "Organization",
            name: "Pixl",
            url: "https://pixldev.be",
            logo: {
              "@type": "ImageObject",
              url: "https://pixldev.be/Logo%20Color.svg",
            },
          },
          datePublished: data.frontmatter.date,
          dateModified: data.frontmatter.date,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://pixldev.be/blog/${data.slug}`,
          },
          keywords: data.frontmatter.keywords?.join(", "),
        };

      case "Article":
        if (!data) return baseData;
        return {
          ...baseData,
          "@type": "Article",
          headline: data.frontmatter.title,
          description: data.frontmatter.description,
          image: data.frontmatter.image,
          author: {
            "@type": "Organization",
            name: "Pixl",
            url: "https://pixldev.be",
          },
          publisher: {
            "@type": "Organization",
            name: "Pixl",
            url: "https://pixldev.be",
            logo: {
              "@type": "ImageObject",
              url: "https://pixldev.be/Logo%20Color.svg",
            },
          },
          datePublished: data.frontmatter.date,
          dateModified: data.frontmatter.date,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://pixldev.be/case-studies/${data.slug}`,
          },
        };

      case "Organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: "Pixl",
          legalName: "Pixl",
          url: "https://pixldev.be",
          logo: "https://pixldev.be/Logo%20Color.svg",
          description:
            "Pixl builds smart, AI-powered software and automations that solve real business problems, fast.",
          foundingDate: "2024",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            url: "https://pixldev.be/#contact",
            availableLanguage: ["English", "French", "Dutch"],
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "BE",
            addressRegion: "Belgium",
          },
          areaServed: ["BE", "FR", "NL", "EU"],
          serviceType: [
            "AI Software Development",
            "Custom Software Development",
            "Business Automation",
            "Digital Transformation",
            "SaaS Development",
          ],
          sameAs: [
            // Add social media links here when available
          ],
        };

      case "WebSite":
        return {
          ...baseData,
          "@type": "WebSite",
          name: "Pixl",
          alternateName: "Pixl AI Software Agency",
          url: "https://pixldev.be",
          description: "Real Software. Built with AI.",
          inLanguage: ["en", "fr", "nl"],
          potentialAction: [
            {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://pixldev.be/blog?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
            {
              "@type": "ContactAction",
              target: "https://pixldev.be/#contact",
            },
          ],
          publisher: {
            "@type": "Organization",
            name: "Pixl",
            url: "https://pixldev.be",
          },
        };

      default:
        return baseData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData()),
      }}
    />
  );
}
