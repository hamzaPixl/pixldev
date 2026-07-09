export const BASE_URL = "https://pixldev.be";
export const SITE_NAME = "Pixl";
export const ORGANIZATION_ID = `${BASE_URL}/#organization`;

export function absoluteUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Dynamic branded OG card (see app/og/route.tsx). */
export function ogImageUrl(title: string): string {
  return `/og?title=${encodeURIComponent(title)}`;
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
