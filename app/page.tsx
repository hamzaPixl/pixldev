import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { HomePageStructuredData } from "@/components/structured-data";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: localeAlternates("/", "en"),
};

export default function Home() {
  return (
    <>
      <HomePageStructuredData />
      <HomeContent />
    </>
  );
}
