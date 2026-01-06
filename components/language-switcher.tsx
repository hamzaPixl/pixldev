"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SupportedLanguages } from "@/lib/translations";

const languageConfig: Record<SupportedLanguages, { name: string; flag: string }> = {
  en: {
    name: "English",
    flag: "EN",
  },
  fr: {
    name: "Fran\u00e7ais",
    flag: "FR",
  },
  nl: {
    name: "Nederlands",
    flag: "NL",
  },
};

interface LanguageSwitcherProps {
  variant?: "icon" | "full" | "dark";
}

export function LanguageSwitcher({ variant = "full" }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLanguageSelect = (lang: SupportedLanguages) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (variant === "icon") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary transition-colors"
          title="Select language"
        >
          <Globe className="w-4 h-4" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 bg-card border-2 border-border z-50 min-w-[120px]">
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
                  currentLanguage === lang
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <span className="font-pixel text-xs">{languageConfig[lang].flag}</span>
                <span>{languageConfig[lang].name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm border-2 transition-colors",
          isDark
            ? "border-primary-foreground/30 text-primary-foreground hover:border-primary-foreground/60"
            : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
        )}
      >
        <Globe className="w-3 h-3" />
        <span className="font-pixel text-xs">{languageConfig[currentLanguage].flag}</span>
        <span className="hidden sm:inline">{languageConfig[currentLanguage].name}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute right-0 top-full mt-2 border-2 z-50 min-w-[140px]",
          isDark ? "bg-primary border-primary-foreground/30" : "bg-card border-border"
        )}>
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
                isDark
                  ? currentLanguage === lang
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  : currentLanguage === lang
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <span className="font-pixel text-xs">{languageConfig[lang].flag}</span>
              <span>{languageConfig[lang].name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
