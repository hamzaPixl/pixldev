"use client";

import Script from "next/script";
import { analyticsConfig, checkAnalyticsConfig } from "@/lib/analytics";
import { useEffect } from "react";

export const GoogleAnalytics = () => {
  useEffect(() => {
    // Debug analytics configuration in development
    if (process.env.NODE_ENV === "development") {
      checkAnalyticsConfig();
    }
  }, []);

  if (!analyticsConfig.googleAnalyticsId) {
    console.warn(
      "Google Analytics ID not configured. Set NEXT_PUBLIC_GA_ID environment variable."
    );
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Google Analytics script loaded successfully");
        }}
        onError={(e) => {
          console.error("Failed to load Google Analytics script:", e);
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsConfig.googleAnalyticsId}', {
            page_path: window.location.pathname,
          });
          console.log('Google Analytics configured with ID: ${analyticsConfig.googleAnalyticsId}');
        `}
      </Script>
    </>
  );
};

export const FacebookPixel = () => {
  if (!analyticsConfig.facebookPixelId) return null;

  return (
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${analyticsConfig.facebookPixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
};

export const Hotjar = () => {
  if (!analyticsConfig.hotjarId) return null;

  return (
    <Script id="hotjar" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${analyticsConfig.hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>
  );
};

export const Plausible = () => {
  if (!analyticsConfig.plausibleDomain) return null;

  return (
    <Script
      defer
      data-domain={analyticsConfig.plausibleDomain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
};
