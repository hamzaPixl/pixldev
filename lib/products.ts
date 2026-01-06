import {
  Receipt,
  Megaphone,
  Users,
  Search,
  Palette,
  Globe,
  BarChart3,
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
  "feen-marketing",
  "feen-lookup",
  "feen-lead",
  "feen-branding",
  "feen-web",
  "feen-analytics",
  "custom",
] as const;

export type ProductId = (typeof PRODUCT_IDS)[number];

// Map product id to translation key
export const productTranslationKeys: Record<ProductId, string> = {
  feen: "products.feen",
  "feen-marketing": "products.feenMarketing",
  "feen-lookup": "products.feenLookup",
  "feen-lead": "products.feenLead",
  "feen-branding": "products.feenBranding",
  "feen-web": "products.feenWeb",
  "feen-analytics": "products.feenAnalytics",
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
    id: "feen-marketing",
    icon: Megaphone,
    status: "coming-soon",
    color: "from-secondary to-secondary/80",
  },
  {
    id: "feen-lookup",
    icon: Search,
    logo: "/feen-icon.svg",
    status: "live",
    url: "https://www.feen.be/company-lookup",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "feen-lead",
    icon: Users,
    status: "coming-soon",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "feen-branding",
    icon: Palette,
    status: "planned",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "feen-web",
    icon: Globe,
    status: "planned",
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "feen-analytics",
    icon: BarChart3,
    status: "planned",
    color: "from-orange-500 to-orange-600",
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
