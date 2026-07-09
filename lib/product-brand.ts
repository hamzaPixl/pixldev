/**
 * Per-product brand accents, shared by the home bento grid and product pages.
 * Feen uses its real brand kit (Feen Blue #0426A8, lime #B0F90E — fill only).
 * Others get one distinctive hue each until their own brands land.
 */
export interface ProductBrand {
  gradient: string;
  hoverBorder: string;
  accentText: string;
  tile: string;
  /** Plain hex for generated OG cards. */
  ogAccent: string;
}

export const productBrand: Record<string, ProductBrand> = {
  feen: {
    gradient: "from-[#0426A8]/40 via-[#0426A8]/10 to-card",
    hoverBorder: "hover:border-[#5C7CFF]/50",
    accentText: "text-[#8FA5FF]",
    tile: "bg-[#0426A8]/30 border-[#5C7CFF]/30",
    ogAccent: "#5C7CFF",
  },
  "company-data": {
    gradient: "from-[#22D3EE]/15 via-card to-card",
    hoverBorder: "hover:border-[#22D3EE]/40",
    accentText: "text-[#67E8F9]",
    tile: "bg-[#22D3EE]/10 border-[#22D3EE]/25",
    ogAccent: "#22D3EE",
  },
  bumpi: {
    gradient: "from-[#A78BFA]/15 via-card to-card",
    hoverBorder: "hover:border-[#A78BFA]/40",
    accentText: "text-[#C4B5FD]",
    tile: "bg-[#A78BFA]/10 border-[#A78BFA]/25",
    ogAccent: "#A78BFA",
  },
  syncco: {
    gradient: "from-[#34D399]/15 via-card to-card",
    hoverBorder: "hover:border-[#34D399]/40",
    accentText: "text-[#6EE7B7]",
    tile: "bg-[#34D399]/10 border-[#34D399]/25",
    ogAccent: "#34D399",
  },
  "pixl-web": {
    gradient: "from-[#F472B6]/12 via-card to-card",
    hoverBorder: "hover:border-[#F472B6]/40",
    accentText: "text-[#F9A8D4]",
    tile: "bg-[#F472B6]/10 border-[#F472B6]/25",
    ogAccent: "#F472B6",
  },
  "pixl-branding": {
    gradient: "from-[#FBBF24]/12 via-card to-card",
    hoverBorder: "hover:border-[#FBBF24]/40",
    accentText: "text-[#FCD34D]",
    tile: "bg-[#FBBF24]/10 border-[#FBBF24]/25",
    ogAccent: "#FBBF24",
  },
  custom: {
    gradient: "from-gold/10 via-card to-card",
    hoverBorder: "hover:border-gold/40",
    accentText: "text-gold",
    tile: "bg-gold/10 border-gold/25",
    ogAccent: "#F0B84E",
  },
};

export function getProductBrand(id: string): ProductBrand {
  return productBrand[id] ?? productBrand["company-data"];
}
