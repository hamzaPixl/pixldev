"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";

const Hero = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Centered Logo above title */}
        <div className="text-center mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]">
          <div className="inline-block">
            <Image
              src="/Logo Color.svg"
              alt="Pixl Logo"
              width={120}
              height={42}
              className="mx-auto mb-6 dark:hidden"
              priority
            />
            <Image
              src="/Logo White.svg"
              alt="Pixl Logo"
              width={120}
              height={42}
              className="mx-auto mb-6 hidden dark:block"
              priority
            />
          </div>
        </div>

        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
          <span className="block text-black dark:text-white mb-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            {t("hero.title.line1")}
          </span>
          <span className="block text-black dark:text-white mb-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            {t("hero.title.line2")}
          </span>
          <span className="block text-pixl-teal opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards,scaleDemo_3s_cubic-bezier(0.25,0.46,0.45,0.94)_1.4s_forwards] hover:scale-110 transition-transform duration-300 cursor-default">
            {t("hero.title.line3")}
          </span>
        </h1>

        <p className="text-xl xs:text-2xl sm:text-3xl text-muted-foreground font-medium mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          {t("hero.subtitle")}
        </p>

        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards]">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-pixl-teal hover:bg-pixl-teal/90 text-black font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pixl-teal/25"
          >
            {t("common.startMyProject")}{" "}
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Animated glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pixl-teal/10 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
};

export default Hero;
