import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@/components/analytics";
import { BASE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#08090A" },
    { media: "(prefers-color-scheme: dark)", color: "#08090A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Pixl — AI systems and business tools for Belgian SMEs",
    template: "%s | Pixl",
  },
  description:
    "Pixl is a Belgian AI studio building business tools for SMEs and freelancers: accounting with Feen, company data, and content. Honest AI, systems over hype.",
  authors: [{ name: "Pixl SRL", url: BASE_URL }],
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
    url: BASE_URL,
    siteName: "Pixl",
    title: "Pixl — AI systems and business tools for Belgian SMEs",
    description:
      "Belgian AI studio building business tools for SMEs and freelancers: accounting with Feen, company data, and content. Honest AI, systems over hype.",
    images: [
      {
        url: "/og?title=AI%20systems%20for%20Belgian%20business&eyebrow=Pixl%20Studio",
        width: 1200,
        height: 630,
        alt: "Pixl — AI systems and business tools for Belgian SMEs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixl — AI systems and business tools for Belgian SMEs",
    description:
      "Belgian AI studio building interconnected business tools and writing openly about the AI systems behind them.",
    images: ["/og?title=AI%20systems%20for%20Belgian%20business&eyebrow=Pixl%20Studio"],
    creator: "@pixl_be",
    site: "@pixl_be",
  },
  icons: [
    { rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "icon", type: "image/png", url: "/favicon-32x32.png", sizes: "32x32" },
    { rel: "icon", type: "image/png", url: "/favicon-16x16.png", sizes: "16x16" },
  ],
  manifest: "/site.webmanifest",
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
      other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION },
    }),
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to content
        </a>
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
