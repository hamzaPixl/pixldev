"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { ContentItem } from "@/lib/content";
import { CaseStudyContent } from "@/components/case-study-content";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { useLanguage } from "@/lib/language-context";

export default function CaseStudyPage() {
  const params = useParams();
  const { currentLanguage, isInitialized } = useLanguage();
  const [caseStudy, setCaseStudy] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  const slug = params.slug as string;

  useEffect(() => {
    if (!isInitialized) return;

    const loadCaseStudy = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/case-studies/${slug}?lang=${currentLanguage}`
        );
        if (response.ok) {
          const study = await response.json();
          setCaseStudy(study);
          setNotFoundError(false);
        } else {
          setNotFoundError(true);
        }
      } catch (error) {
        console.error("Error loading case study:", error);
        setNotFoundError(true);
      }
      setLoading(false);
    };

    loadCaseStudy();
  }, [slug, currentLanguage, isInitialized]);

  if (!isInitialized || loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 xs:pt-20 sm:pt-24">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  if (notFoundError) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        {caseStudy && <CaseStudyContent caseStudy={caseStudy} />}
        <Footer />
      </main>
    </>
  );
}
