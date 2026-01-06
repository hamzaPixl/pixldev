// Google Analytics 4 helper functions

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Check if GA is loaded
export const isGALoaded = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

// Track page views
export const trackPageView = (url: string): void => {
  if (!isGALoaded()) return;

  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID as string, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!isGALoaded()) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track contact form submission
export const trackContactFormSubmit = (formName: string = "contact"): void => {
  trackEvent("form_submit", "Contact", formName);
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string): void => {
  trackEvent("cta_click", "CTA", `${ctaName} - ${location}`);
};

// Track product card clicks
export const trackProductClick = (productId: string, productName: string): void => {
  trackEvent("product_click", "Products", `${productName} (${productId})`);
};

// Track language changes
export const trackLanguageChange = (language: string): void => {
  trackEvent("language_change", "Settings", language);
};

// Track external link clicks
export const trackExternalLink = (url: string, linkName: string): void => {
  trackEvent("external_link", "Navigation", `${linkName}: ${url}`);
};
