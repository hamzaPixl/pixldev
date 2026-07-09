import { notFound } from "next/navigation";

// Only prefixed locales live here; English stays at the root.
const PREFIXED = ["fr", "nl"] as const;

export function generateStaticParams() {
  return PREFIXED.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(PREFIXED as readonly string[]).includes(lang)) {
    notFound();
  }
  return children;
}
