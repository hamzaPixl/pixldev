"use client";

import { useLanguage } from "@/lib/language-context";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SupportedLanguages } from "@/lib/translations";

const languageConfig: Record<SupportedLanguages, { name: string; flag: string }> = {
  en: { name: "English", flag: "EN" },
  fr: { name: "Français", flag: "FR" },
  nl: { name: "Nederlands", flag: "NL" },
};

interface LanguageSwitcherProps {
  variant?: "icon" | "full" | "dark";
}

export function LanguageSwitcher({ variant = "full" }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "icon" ? (
          <Button variant="ghost" size="icon" aria-label="Select language">
            <Globe />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
            <Globe className="!size-3" />
            <span className="font-mono text-xs">{languageConfig[currentLanguage].flag}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className="gap-2.5"
          >
            <span className="font-mono text-xs text-muted-foreground">
              {languageConfig[lang].flag}
            </span>
            <span>{languageConfig[lang].name}</span>
            {currentLanguage === lang && <Check className="ml-auto !size-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
