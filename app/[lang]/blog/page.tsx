import { Metadata } from "next";

import { absoluteUrl, ogImageUrl, organizationSchema, localeAlternates, type Locale } from "@/lib/seo";
import { translations } from "@/lib/translations";
import { BlogIndexClient } from "@/app/blog/client";

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
  const t = translations[locale].blog;
  const title = `${t.title} — Pixl`;
  const description = t.subtitle;
  const og = ogImageUrl(t.title, { eyebrow: t.title });

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: absoluteUrl(`/${locale}/blog`),
      siteName: "Pixl",
      title,
      description,
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
    alternates: localeAlternates("/blog", locale),
  };
}

export default function LangBlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <BlogIndexClient />
    </>
  );
}
