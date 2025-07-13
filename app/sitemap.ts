import {
  getAllBlogPosts,
  getAllCaseStudies,
  SUPPORTED_LANGUAGES,
  ContentItem,
} from "@/lib/content";
import { MetadataRoute } from "next";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pixldev.be";
  const currentDate = new Date();

  // Get content for all languages
  const contentPromises = SUPPORTED_LANGUAGES.map(async (lang) => {
    // Check if content actually exists for this language (no fallback)
    const langBlogDir = path.join(process.cwd(), "content/blog", lang);
    const langCaseStudyDir = path.join(
      process.cwd(),
      "content/case-studies",
      lang
    );

    const fs = await import("fs");
    const blogExists =
      fs.existsSync(langBlogDir) &&
      fs.readdirSync(langBlogDir).filter((f) => f.endsWith(".md")).length > 0;
    const caseStudyExists =
      fs.existsSync(langCaseStudyDir) &&
      fs.readdirSync(langCaseStudyDir).filter((f) => f.endsWith(".md")).length >
        0;

    let blogPosts: ContentItem[] = [];
    let caseStudies: ContentItem[] = [];

    if (blogExists) {
      blogPosts = await getAllBlogPosts(lang);
    }
    if (caseStudyExists) {
      caseStudies = await getAllCaseStudies(lang);
    }

    return { lang, blogPosts, caseStudies, blogExists, caseStudyExists };
  });

  const allContent = await Promise.all(contentPromises);

  // Static pages for each language
  const staticPages: MetadataRoute.Sitemap = [];

  SUPPORTED_LANGUAGES.forEach((lang) => {
    const langPath = lang === "en" ? "" : `/${lang}`;
    const langContent = allContent.find((content) => content.lang === lang);
    const hasContent =
      langContent && (langContent.blogExists || langContent.caseStudyExists);

    // Only include pages for languages that actually have content
    if (hasContent || lang === "en") {
      // Homepage - only include alternates for languages with content
      staticPages.push({
        url: `${baseUrl}${langPath}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 1,
        alternates: {
          languages: Object.fromEntries(
            allContent
              .filter(
                (content) =>
                  content.blogExists ||
                  content.caseStudyExists ||
                  content.lang === "en"
              )
              .map(({ lang: l }) => [
                l,
                l === "en" ? baseUrl : `${baseUrl}/${l}`,
              ])
          ),
        },
      });

      // Blog and case studies pages - only if there's actual content
      // Blog and case studies pages - only if there's actual content
      if (langContent?.blogExists) {
        staticPages.push({
          url: `${baseUrl}${langPath}/blog`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              // Only include languages that have blog content
              allContent
                .filter((content) => content.blogExists)
                .map(({ lang: l }) => [
                  l,
                  l === "en" ? `${baseUrl}/blog` : `${baseUrl}/${l}/blog`,
                ])
            ),
          },
        });
      }

      if (langContent?.caseStudyExists) {
        staticPages.push({
          url: `${baseUrl}${langPath}/case-studies`,
          lastModified: currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              // Only include languages that have case study content
              allContent
                .filter((content) => content.caseStudyExists)
                .map(({ lang: l }) => [
                  l,
                  l === "en"
                    ? `${baseUrl}/case-studies`
                    : `${baseUrl}/${l}/case-studies`,
                ])
            ),
          },
        });
      }
    }
  });

  // Blog posts for all languages (only generate for languages that have content)
  const blogPages: MetadataRoute.Sitemap = [];
  allContent.forEach(({ lang, blogPosts, blogExists }) => {
    // Only generate blog entries if the language actually has blog posts
    if (blogExists && blogPosts.length > 0) {
      blogPosts.forEach((post) => {
        const langPath = lang === "en" ? "" : `/${lang}`;

        // Find which languages have this specific blog post
        const availableLanguages = allContent
          .filter(({ blogPosts: posts }) =>
            posts.some((p) => p.slug === post.slug)
          )
          .map(({ lang }) => lang);

        blogPages.push({
          url: `${baseUrl}${langPath}/blog/${post.slug}`,
          lastModified: new Date(post.frontmatter.date),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              availableLanguages.map((l) => [
                l,
                l === "en"
                  ? `${baseUrl}/blog/${post.slug}`
                  : `${baseUrl}/${l}/blog/${post.slug}`,
              ])
            ),
          },
        });
      });
    }
  });

  // Case studies for all languages (only generate for languages that have content)
  const caseStudyPages: MetadataRoute.Sitemap = [];
  allContent.forEach(({ lang, caseStudies }) => {
    // Only generate case study entries if the language actually has case studies
    if (caseStudies.length > 0) {
      caseStudies.forEach((study) => {
        const langPath = lang === "en" ? "" : `/${lang}`;

        // Find which languages have this specific case study
        const availableLanguages = allContent
          .filter(({ caseStudies: studies }) =>
            studies.some((s) => s.slug === study.slug)
          )
          .map(({ lang }) => lang);

        caseStudyPages.push({
          url: `${baseUrl}${langPath}/case-studies/${study.slug}`,
          lastModified: new Date(study.frontmatter.date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              availableLanguages.map((l) => [
                l,
                l === "en"
                  ? `${baseUrl}/case-studies/${study.slug}`
                  : `${baseUrl}/${l}/case-studies/${study.slug}`,
              ])
            ),
          },
        });
      });
    }
  });

  return [...staticPages, ...blogPages, ...caseStudyPages];
}
