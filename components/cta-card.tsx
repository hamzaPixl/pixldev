"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useLanguage } from "@/lib/language-context";

const CTACard = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pixl-teal/10 to-pixl-teal/5 backdrop-blur-lg border border-pixl-teal/20 p-8 md:p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-pixl-teal hover:bg-pixl-teal/90 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pixl-teal/25"
            >
              {t("common.getStarted")} <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pixl-teal/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CTACard;
