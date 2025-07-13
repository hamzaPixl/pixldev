import { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/content";
import CaseStudiesList from "@/components/case-studies-list";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Case Studies | Pixl - Real Success Stories",
  description:
    "Explore our portfolio of successful AI-powered solutions. See how we've helped businesses transform with intelligent software and measurable results.",
  openGraph: {
    title: "Case Studies | Pixl - Real Success Stories",
    description:
      "Explore our portfolio of successful AI-powered solutions. See how we've helped businesses transform with intelligent software and measurable results.",
    type: "website",
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <CaseStudiesList caseStudies={caseStudies} />
        <Footer />
      </main>
    </>
  );
}
