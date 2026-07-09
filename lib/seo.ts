export const BASE_URL = "https://pixldev.be";
export const SITE_NAME = "Pixl";
export const ORGANIZATION_ID = `${BASE_URL}/#organization`;

export function absoluteUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export type Locale = "en" | "fr" | "nl";
export const LOCALES: Locale[] = ["en", "fr", "nl"];

/** Per-locale absolute URLs for an English path ("/" or "/blog/x"). */
export function localeUrls(path: string): Record<Locale, string> {
  const clean = path === "/" ? "" : path;
  return {
    en: `${BASE_URL}${clean || "/"}`,
    fr: `${BASE_URL}/fr${clean}`,
    nl: `${BASE_URL}/nl${clean}`,
  };
}

/** canonical + hreflang alternates for a page, given its English path + locale. */
export function localeAlternates(path: string, locale: Locale) {
  const urls = localeUrls(path);
  return {
    canonical: urls[locale],
    languages: { ...urls, "x-default": urls.en },
  };
}

/** Dynamic branded OG card (see app/og/route.tsx). */
export function ogImageUrl(
  title: string,
  opts: { eyebrow?: string; accent?: string; image?: string } = {}
): string {
  const params = new URLSearchParams({ title });
  if (opts.eyebrow) params.set("eyebrow", opts.eyebrow);
  if (opts.accent) params.set("accent", opts.accent);
  if (opts.image) params.set("image", opts.image);
  return `/og?${params.toString()}`;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Pixl SRL",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.svg`,
  },
  description:
    "Pixl is a Belgian AI studio building interconnected business tools and AI systems for SMEs, freelancers, and accountants.",
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@pixldev.be",
    telephone: "+32488203567",
    contactType: "customer service",
    availableLanguage: ["English", "French", "Dutch"],
  },
  sameAs: ["https://www.linkedin.com/company/pixl-srl"],
  areaServed: ["BE", "FR", "NL", "EU"],
  vatID: "BE0805449693",
};
