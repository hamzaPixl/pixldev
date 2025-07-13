import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";
import NetlifyForm from "@/components/netlify-form";
import {
  GoogleAnalytics,
  FacebookPixel,
  Hotjar,
  Plausible,
} from "@/components/analytics";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pixl.dev"),
  title: "Pixl — Real Software. Built with AI.",
  description:
    "Pixl builds smart, AI-powered software and automations that solve real business problems, fast. From dashboards to full SaaS apps — we deliver solutions, not hype.",
  keywords: [
    "AI software agency",
    "digital transformation",
    "automation tools",
    "custom SaaS",
    "AI chatbot",
    "internal apps",
    "business productivity",
    "AI dashboards",
    "workflow automation",
    "smart dashboards",
    "business portals",
    "scalable infrastructure",
    "AI-powered solutions",
    "custom software development",
  ],
  openGraph: {
    type: "website",
    siteName: "Pixl",
    locale: "en_US",
    url: "https://pixl.dev",
    title: "Pixl — AI software that actually works",
    description: "Start your project in 3 steps. We'll handle the rest.",
    images: [
      {
        url: "/images/pixl-hero-og.png",
        width: 1200,
        height: 630,
        alt: "Pixl - AI Software Agency",
      },
    ],
  },
  authors: [
    {
      name: "Pixl Team",
      url: "https://pixl.dev",
    },
  ],
  creator: "Pixl",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <FacebookPixel />
        <Hotjar />
        <Plausible />
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <TooltipProvider>
              {children}
              <NetlifyForm />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
