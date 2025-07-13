'use client';

import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languageConfig = {
  en: {
    name: 'English',
    flag: '🇺🇸',
  },
  fr: {
    name: 'Français', 
    flag: '🇫🇷',
  },
  nl: {
    name: 'Nederlands',
    flag: '🇳🇱',
  },
};

interface LanguageSwitcherProps {
  variant?: 'icon' | 'full';
}

export function LanguageSwitcher({ variant = 'full' }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  if (variant === 'icon') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-pixl-teal/10 hover:text-pixl-teal transition-colors"
            title="Select Language"
          >
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[120px]">
          {supportedLanguages.map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`flex items-center gap-2 hover:!bg-pixl-teal/10 hover:!text-pixl-teal focus:!bg-pixl-teal/10 focus:!text-pixl-teal transition-colors ${
                currentLanguage === lang ? 'bg-pixl-teal/20 text-pixl-teal' : ''
              }`}
            >
              <span className="text-sm">{languageConfig[lang].flag}</span>
              <span className="text-xs">{languageConfig[lang].name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-3 text-xs border-border/50 hover:border-pixl-teal/50 hover:text-pixl-teal hover:bg-pixl-teal/10 transition-colors">
          <Globe className="mr-2 h-3 w-3" />
          <span className="mr-1">{languageConfig[currentLanguage].flag}</span>
          {languageConfig[currentLanguage].name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex items-center gap-2 hover:!bg-pixl-teal/10 hover:!text-pixl-teal focus:!bg-pixl-teal/10 focus:!text-pixl-teal transition-colors ${
              currentLanguage === lang ? 'bg-pixl-teal/20 text-pixl-teal' : ''
            }`}
          >
            <span className="text-sm">{languageConfig[lang].flag}</span>
            <span className="text-sm">{languageConfig[lang].name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}