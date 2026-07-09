import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Self-hosted on a VPS: emit a minimal standalone server (.next/standalone).
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Old "Feen ___" module URLs → real product names
    return [
      { source: "/product/feen-marketing", destination: "/product/bumpi", permanent: true },
      { source: "/product/feen-lookup", destination: "/product/company-data", permanent: true },
      { source: "/product/feen-lead", destination: "/product/syncco", permanent: true },
      { source: "/product/feen-branding", destination: "/product/pixl-branding", permanent: true },
      { source: "/product/feen-web", destination: "/product/pixl-web", permanent: true },
      { source: "/product/feen-analytics", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
      {
        source: "/brand.md",
        headers: [{ key: "Content-Type", value: "text/markdown; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
