"use client";

import Script from "next/script";

const baseUrl = "https://pixldev.be";

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
}

export function OrganizationSchema({
  name = "Pixl SRL",
  url = baseUrl,
  logo = `${baseUrl}/logo.svg`,
  description = "Pixl builds interconnected business tools for accounting, marketing, leads, branding, and more. One account, all your business needs.",
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
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
    knowsLanguage: ["en", "fr", "nl"],
    vatID: "BE0805449693",
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

export function WebsiteSchema({
  name = "Pixl Ecosystem",
  url = baseUrl,
  description = "Discover the Pixl ecosystem - interconnected business tools for accounting, marketing, leads, branding, and more.",
}: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    inLanguage: ["en", "fr", "nl"],
    publisher: {
      "@type": "Organization",
      name: "Pixl SRL",
      url: baseUrl,
    },
    potentialAction: {
      "@type": "ContactAction",
      name: "Contact Us",
      target: `${baseUrl}/#contact`,
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  url?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory = "BusinessApplication",
  operatingSystem = "Web",
  offers,
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: url || baseUrl,
    applicationCategory,
    operatingSystem,
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price,
        priceCurrency: offers.priceCurrency,
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "Pixl SRL",
    },
  };

  return (
    <Script
      id={`software-schema-${name.toLowerCase().replace(/\s+/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined schema for the homepage
export function HomePageStructuredData() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <SoftwareApplicationSchema
        name="Feen"
        description="AI-powered accounting, invoicing, and contact management for Belgian SMEs."
        url="https://feen.be"
        offers={{ price: "19", priceCurrency: "EUR" }}
      />
    </>
  );
}

// Product page structured data
interface ProductPageStructuredDataProps {
  productId: string;
  productName: string;
  description: string;
  url?: string;
}

export function ProductPageStructuredData({
  productId,
  productName,
  description,
  url,
}: ProductPageStructuredDataProps) {
  const productSchemas: Record<string, { category: string; offers?: { price: string; priceCurrency: string } }> = {
    feen: {
      category: "BusinessApplication, FinanceSoftware",
      offers: { price: "19", priceCurrency: "EUR" },
    },
    "feen-marketing": {
      category: "BusinessApplication, MarketingSoftware",
    },
    "feen-lookup": {
      category: "BusinessApplication, DataSoftware",
    },
    "feen-lead": {
      category: "BusinessApplication, SalesSoftware",
    },
    "feen-branding": {
      category: "BusinessApplication, DesignSoftware",
    },
    "feen-web": {
      category: "BusinessApplication, WebsiteBuilder",
    },
    "feen-analytics": {
      category: "BusinessApplication, AnalyticsSoftware",
    },
  };

  const productConfig = productSchemas[productId] || { category: "BusinessApplication" };

  return (
    <>
      <OrganizationSchema />
      <SoftwareApplicationSchema
        name={productName}
        description={description}
        url={url || `${baseUrl}/product/${productId}`}
        applicationCategory={productConfig.category}
        offers={productConfig.offers}
      />
    </>
  );
}
