import type { SupportedLanguages } from "@/lib/translations";
import { blogPosts, type BlogPostData } from "./blog-data.generated";

export type { BlogPostData };

export interface BlogPost {
  slug: string;
  icon: BlogPostData["icon"];
  date: string;
  authors: { name: string; linkedin: string }[];
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
  content: string;
}

function resolve(post: BlogPostData, lang: SupportedLanguages): BlogPost {
  return {
    slug: post.slug,
    icon: post.icon,
    date: post.date,
    authors: post.authors,
    title: post.title[lang],
    description: post.description[lang],
    category: post.category[lang],
    tags: post.tags[lang],
    readTime: post.readTime[lang],
    content: post.content[lang],
  };
}

export function getAllBlogPosts(lang: SupportedLanguages = "en"): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((p) => resolve(p, lang));
}

export function getBlogPost(slug: string, lang: SupportedLanguages = "en"): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  return post ? resolve(post, lang) : undefined;
}
