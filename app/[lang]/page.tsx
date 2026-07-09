import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { HomePageStructuredData } from "@/components/structured-data";
import { ogImageUrl, absoluteUrl, localeAlternates, type Locale } from "@/lib/seo";
import { translations } from "@/lib/translations";

const PREFIXED: Locale[] = ["fr", "nl"];

export function generateStaticParams() {
  return PREFIXED.map((lang) => ({ lang }));
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const h = translations[locale].home;
  const title = `Pixl — ${h.heroTitle1} ${h.heroTitle2}`.replace(/[_>]/g, "").trim();
  const description =
    h.heroSubtitle.length > 160
      ? `${h.heroSubtitle.slice(0, 157).replace(/\s+\S*$/, "")}…`
      : h.heroSubtitle;
  const og = ogImageUrl("Pixl", { eyebrow: "Pixl Studio" });

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: `${locale}_BE`,
      url: absoluteUrl(`/${locale}`),
      siteName: "Pixl",
      title,
      description,
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
    alternates: localeAlternates("/", locale),
  };
}

export default function LangHome() {
  return (
    <>
      <HomePageStructuredData />
      <HomeContent />
    </>
  );
}
