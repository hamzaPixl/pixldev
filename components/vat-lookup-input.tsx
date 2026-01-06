"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function VatLookupInput() {
  const { t } = useLanguage();
  const [vat, setVat] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vat.trim()) return;

    // Clean the VAT number (remove spaces and dots)
    let cleanVat = vat.replace(/[\s.]/g, "").toUpperCase();

    // Add BE prefix if not present
    if (!cleanVat.startsWith("BE")) {
      cleanVat = "BE" + cleanVat;
    }

    // Redirect to Feen lookup
    window.open(`https://www.feen.be/company-lookup?vat=${cleanVat}`, "_blank");
  };

  return (
    <div className="my-6 sm:my-8 p-4 sm:p-6 bg-card border-2 border-primary/30">
      <h3 className="font-pixel text-sm sm:text-base text-primary mb-3 sm:mb-4">{t("vatLookup.title")}</h3>
      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
        {t("vatLookup.description")}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <input
          type="text"
          value={vat}
          onChange={(e) => setVat(e.target.value)}
          placeholder={t("vatLookup.placeholder")}
          className="flex-1 bg-background border-2 border-border px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-foreground focus:border-primary focus:outline-none transition-colors"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base"
        >
          <Search className="w-3 h-3 sm:w-4 sm:h-4" />
          {t("vatLookup.button")}
        </button>
      </form>
      <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
        {t("vatLookup.example")}
      </p>
    </div>
  );
}
