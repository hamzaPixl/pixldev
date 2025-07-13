import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCaseStudy, getAllCaseStudies } from "@/lib/content";
import { CaseStudyContent } from "@/components/case-study-content";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${caseStudy.frontmatter.title} | Pixl Case Studies`,
    description: caseStudy.frontmatter.description,
    keywords: caseStudy.frontmatter.keywords?.join(", "),
    openGraph: {
      title: caseStudy.frontmatter.title,
      description: caseStudy.frontmatter.description,
      images: caseStudy.frontmatter.image ? [caseStudy.frontmatter.image] : [],
      type: "article",
      publishedTime: caseStudy.frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.frontmatter.title,
      description: caseStudy.frontmatter.description,
      images: caseStudy.frontmatter.image ? [caseStudy.frontmatter.image] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <CaseStudyContent caseStudy={caseStudy} />
        <Footer />
      </main>
    </>
  );
}
