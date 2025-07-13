// Analytics configuration and utilities
interface AnalyticsConfig {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  hotjarId?: string;
  mixpanelToken?: string;
  plausibleDomain?: string;
}

export const analyticsConfig: AnalyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
  mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
};

// Debug function to check if analytics are configured
export const checkAnalyticsConfig = () => {
  if (typeof window !== "undefined") {
    console.log("Analytics Configuration:", {
      googleAnalyticsId: analyticsConfig.googleAnalyticsId
        ? "✓ Configured"
        : "✗ Missing",
      facebookPixelId: analyticsConfig.facebookPixelId
        ? "✓ Configured"
        : "✗ Missing",
      hotjarId: analyticsConfig.hotjarId ? "✓ Configured" : "✗ Missing",
      mixpanelToken: analyticsConfig.mixpanelToken
        ? "✓ Configured"
        : "✗ Missing",
      plausibleDomain: analyticsConfig.plausibleDomain
        ? "✓ Configured"
        : "✗ Missing",
    });
  }
};

// Google Analytics events
export const gtag = (...args: unknown[]) => {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(...args);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  gtag("config", analyticsConfig.googleAnalyticsId, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  gtag("event", eventName, {
    event_category: "engagement",
    event_label: eventName,
    ...parameters,
  });
};

// Business-specific tracking events

export const trackContactFormSubmit = () => {
  trackEvent("contact_form_submit", {
    event_category: "lead_generation",
    event_label: "contact_form",
  });
};

export const trackCTAClick = (ctaLocation: string) => {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: ctaLocation,
  });
};

export const trackSectionView = (sectionName: string) => {
  trackEvent("section_view", {
    event_category: "engagement",
    event_label: sectionName,
  });
};

// Facebook Pixel events
export const fbPixel = (
  event: string,
  parameters?: Record<string, unknown>
) => {
  if (
    typeof window !== "undefined" &&
    (
      window as unknown as {
        fbq?: (
          action: string,
          event: string,
          params?: Record<string, unknown>
        ) => void;
      }
    ).fbq
  ) {
    (
      window as unknown as {
        fbq: (
          action: string,
          event: string,
          params?: Record<string, unknown>
        ) => void;
      }
    ).fbq("track", event, parameters);
  }
};

export const trackFBLead = () => {
  fbPixel("Lead");
};

export const trackFBCompleteRegistration = () => {
  fbPixel("CompleteRegistration");
};

// Hotjar events
export const hotjarEvent = (eventName: string) => {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { hj?: (action: string, eventName: string) => void })
      .hj
  ) {
    (
      window as unknown as { hj: (action: string, eventName: string) => void }
    ).hj("event", eventName);
  }
};
