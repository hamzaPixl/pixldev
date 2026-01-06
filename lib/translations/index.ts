import en from "./en";
import fr from "./fr";
import nl from "./nl";

export const translations = {
  en,
  fr,
  nl,
};

export type SupportedLanguages = "en" | "fr" | "nl";
export type TranslationKey = keyof typeof en;

export default translations;
