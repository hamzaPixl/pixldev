import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

export interface ContentFrontmatter {
  title: string;
  description: string;
  date: string;
  industry?: string;
  client?: string;
  image?: string;
  keywords?: string[];
  published?: boolean;
  category?: string;
}

export interface ContentItem {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: string;
  htmlContent: string;
}

const CASE_STUDIES_DIRECTORY = path.join(process.cwd(), "content/case-studies");
const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

// Default language
const DEFAULT_LANGUAGE = "en";

// Supported languages
export const SUPPORTED_LANGUAGES = ["en", "fr", "nl"];

// Ensure directories exist
const ensureDirectoryExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Generic function to get all content from a directory with language support
const getAllContent = async (
  directory: string,
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem[]> => {
  const languageDirectory = path.join(directory, language);
  ensureDirectoryExists(languageDirectory);

  let fileNames: string[] = [];
  
  if (fs.existsSync(languageDirectory)) {
    fileNames = fs.readdirSync(languageDirectory).filter(fileName => fileName.endsWith(".md"));
  }

  // If no markdown files found and not using default language, fallback to default language
  if (fileNames.length === 0 && language !== DEFAULT_LANGUAGE) {
    console.log(`No content found for language ${language}, falling back to ${DEFAULT_LANGUAGE}`);
    return getAllContent(directory, DEFAULT_LANGUAGE);
  }

  const allContent = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return await getContent(directory, slug, language);
    })
  );

  return allContent
    .filter((item): item is ContentItem => item !== null)
    .filter((item) => item.frontmatter.published !== false)
    .sort((a, b) =>
      new Date(b.frontmatter.date) > new Date(a.frontmatter.date) ? 1 : -1
    );
};

// Generic function to get single content item with language support
const getContent = async (
  directory: string,
  slug: string,
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem | null> => {
  try {
    const languageDirectory = path.join(directory, language);
    const fullPath = path.join(languageDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      // Fallback to default language
      if (language !== DEFAULT_LANGUAGE) {
        return getContent(directory, slug, DEFAULT_LANGUAGE);
      }
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    const htmlContent = processedContent.toString();

    return {
      slug,
      frontmatter: data as ContentFrontmatter,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading content for slug ${slug}:`, error);
    return null;
  }
};

// Case Studies specific functions
export const getAllCaseStudies = async (
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem[]> => {
  return getAllContent(CASE_STUDIES_DIRECTORY, language);
};

export const getCaseStudy = async (
  slug: string,
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem | null> => {
  return getContent(CASE_STUDIES_DIRECTORY, slug, language);
};

// Blog specific functions
export const getAllBlogPosts = async (
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem[]> => {
  return getAllContent(BLOG_DIRECTORY, language);
};

export const getBlogPost = async (
  slug: string,
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem | null> => {
  return getContent(BLOG_DIRECTORY, slug, language);
};

// Generic search function
export const searchContent = async (
  directory: string,
  query: string,
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem[]> => {
  const allContent = await getAllContent(directory, language);
  const lowerQuery = query.toLowerCase();

  return allContent.filter(
    (item) =>
      item.frontmatter.title.toLowerCase().includes(lowerQuery) ||
      item.frontmatter.description.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery) ||
      (item.frontmatter.keywords &&
        item.frontmatter.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowerQuery)
        ))
  );
};

export const searchCaseStudies = async (
  query: string,
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem[]> => {
  return searchContent(CASE_STUDIES_DIRECTORY, query, language);
};

export const searchBlogPosts = async (
  query: string,
  language: string = DEFAULT_LANGUAGE
): Promise<ContentItem[]> => {
  return searchContent(BLOG_DIRECTORY, query, language);
};
