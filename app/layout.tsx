import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@/components/analytics";
import { HomePageStructuredData } from "@/components/structured-data";

const baseUrl = "https://pixldev.be";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00ff00" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Pixl Ecosystem — All-in-One Business Tools for Belgian SMEs",
    template: "%s | Pixl",
  },
  description:
    "Discover the Pixl ecosystem - interconnected business tools for accounting, marketing, leads, branding, and more. One account, all your business needs. Built for Belgian SMEs and freelancers.",
  keywords: [
    // Primary keywords
    "Pixl",
    "business tools",
    "Belgian SME software",
    "freelancer tools Belgium",
    // Accounting
    "AI accounting software",
    "automated bookkeeping",
    "invoicing software Belgium",
    "Feen accounting",
    "OCR invoice extraction",
    "Peppol ready",
    // Marketing
    "AI marketing automation",
    "content generation",
    "social media automation",
    // Lead generation
    "lead generation Belgium",
    "prospection software",
    "company lookup Belgium",
    // General
    "business automation",
    "all-in-one business platform",
    "SME software Belgium",
    "startup tools",
  ],
  authors: [{ name: "Pixl SRL", url: baseUrl }],
  creator: "Pixl SRL",
  publisher: "Pixl SRL",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_BE",
    alternateLocale: ["fr_BE", "nl_BE"],
    url: baseUrl,
    siteName: "Pixl Ecosystem",
    title: "Pixl Ecosystem — All-in-One Business Tools",
    description:
      "Discover the Pixl ecosystem - interconnected business tools for accounting, marketing, leads, branding, and more. One account, all your business needs.",
    images: [
      {
        url: "/og-image.png",
        width: 1536,
        height: 1024,
        alt: "Pixl Ecosystem - All-in-One Business Tools for Belgian SMEs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixl Ecosystem — All-in-One Business Tools",
    description:
      "Discover the Pixl ecosystem - interconnected business tools for accounting, marketing, leads, branding, and more.",
    images: ["/og-image.png"],
    creator: "@pixl_be",
    site: "@pixl_be",
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "icon", type: "image/png", url: "/favicon-32x32.png", sizes: "32x32" },
    { rel: "icon", type: "image/png", url: "/favicon-16x16.png", sizes: "16x16" },
    { rel: "icon", type: "image/png", url: "/android-chrome-192x192.png", sizes: "192x192" },
    { rel: "icon", type: "image/png", url: "/android-chrome-512x512.png", sizes: "512x512" },
  ],
  manifest: "/site.webmanifest",
  alternates: {
    canonical: baseUrl,
    languages: {
      en: baseUrl,
      fr: baseUrl,
      nl: baseUrl,
    },
  },
  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          {children}
          <Analytics />
          <HomePageStructuredData />
        </LanguageProvider>
      </body>
    </html>
  );
}
