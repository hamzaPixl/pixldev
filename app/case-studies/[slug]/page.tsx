import { notFound } from "next/navigation";
import {
  getCaseStudy,
  getAllCaseStudies,
  SUPPORTED_LANGUAGES,
} from "@/lib/content";
import { CaseStudyContent } from "@/components/case-study-content";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import StructuredData from "@/components/structured-data";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Pixl",
      description: "The requested case study could not be found.",
    };
  }

  const { frontmatter } = caseStudy;

  return {
    title: `${frontmatter.title} | Pixl Case Studies`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    authors: [{ name: "Pixl Team", url: "https://pixldev.be" }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      images: frontmatter.image
        ? [
            {
              url: frontmatter.image,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ]
        : undefined,
      siteName: "Pixl",
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
    robots: {
      index: frontmatter.published !== false,
      follow: true,
    },
    alternates: {
      canonical: `https://pixldev.be/case-studies/${slug}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => [
          lang,
          lang === "en"
            ? `https://pixldev.be/case-studies/${slug}`
            : `https://pixldev.be/${lang}/case-studies/${slug}`,
        ])
      ),
    },
  };
}

// Generate static params for ISR
export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <StructuredData type="Article" data={caseStudy} />
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <CaseStudyContent caseStudy={caseStudy} />
        <Footer />
      </main>
    </>
  );
}
