'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { SupportedLanguages } from '@/lib/translations';

interface LanguageContextType {
  currentLanguage: SupportedLanguages;
  setLanguage: (language: SupportedLanguages) => void;
  t: (key: string) => string;
  isInitialized: boolean;
  supportedLanguages: SupportedLanguages[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const translateHook = useTranslate();

  return (
    <LanguageContext.Provider value={translateHook}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}