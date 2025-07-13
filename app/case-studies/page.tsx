"use client";

import { useState, useEffect } from "react";
import { ContentItem } from "@/lib/content";
import CaseStudiesList from "@/components/case-studies-list";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { useLanguage } from "@/lib/language-context";

export default function CaseStudiesPage() {
  const { currentLanguage, isInitialized } = useLanguage();
  const [caseStudies, setCaseStudies] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isInitialized) return;

    const loadCaseStudies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/case-studies?lang=${currentLanguage}`
        );
        if (response.ok) {
          const studies = await response.json();
          setCaseStudies(studies);
        }
      } catch (error) {
        console.error("Error loading case studies:", error);
      }
      setLoading(false);
    };

    loadCaseStudies();
  }, [currentLanguage, isInitialized]);

  if (!isInitialized || loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 xs:pt-20 sm:pt-24">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
          <Footer />
        </main>
      </>
    );
  }

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
