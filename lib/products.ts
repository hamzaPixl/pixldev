import {
  Receipt,
  Sparkles,
  Search,
  ShieldCheck,
  Palette,
  Globe,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export type ProductStatus = "live" | "coming-soon" | "planned" | "hidden" | "contact";

// Static product data - all text content comes from translations
export interface ProductStatic {
  id: string;
  icon: LucideIcon;
  logo?: string;
  status: ProductStatus;
  featured?: boolean;
  url?: string;
  color: string;
}

// Product IDs as const for type safety
export const PRODUCT_IDS = [
  "feen",
  "company-data",
  "bumpi",
  "syncco",
  "pixl-web",
  "pixl-branding",
  "custom",
] as const;

export type ProductId = (typeof PRODUCT_IDS)[number];

// Map product id to translation key
export const productTranslationKeys: Record<ProductId, string> = {
  feen: "products.feen",
  "company-data": "products.companyData",
  bumpi: "products.bumpi",
  syncco: "products.syncco",
  "pixl-web": "products.pixlWeb",
  "pixl-branding": "products.pixlBranding",
  custom: "products.custom",
};

// Static product data only - no text content
export const productsStatic: ProductStatic[] = [
  {
    id: "feen",
    icon: Receipt,
    logo: "/feen-icon.svg",
    status: "live",
    featured: true,
    url: "https://feen.be",
    color: "from-primary to-primary/80",
  },
  {
    id: "company-data",
    icon: Search,
    status: "live",
    url: "https://www.feen.be/company-lookup",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "bumpi",
    icon: Sparkles,
    status: "coming-soon",
    color: "from-secondary to-secondary/80",
  },
  {
    id: "syncco",
    icon: ShieldCheck,
    status: "coming-soon",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "pixl-web",
    icon: Globe,
    status: "planned",
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "pixl-branding",
    icon: Palette,
    status: "planned",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "custom",
    icon: MessageCircle,
    status: "contact",
    color: "from-primary to-secondary",
  },
];

// Helper to get static product by id
export const getProductStatic = (id: string): ProductStatic | undefined =>
  productsStatic.find((p) => p.id === id);

// Helper to get visible products (non-hidden)
export const getVisibleProductsStatic = (): ProductStatic[] =>
  productsStatic.filter((p) => p.status !== "hidden");

// Helper to get translation key for a product
export const getProductTranslationKey = (id: string): string =>
  productTranslationKeys[id as ProductId] || "";
