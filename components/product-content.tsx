"use client";

import React from "react";
import { VatLookupInput } from "@/components/vat-lookup-input";
import { useLanguage } from "@/lib/language-context";

interface ProductContentProps {
  productId: string;
}

export function ProductContent({ productId }: ProductContentProps) {
  const ContentComponent = contentMap[productId];
  if (!ContentComponent) return null;
  return <div className="product-content"><ContentComponent /></div>;
}

// Styled components for content
// Renders h2: the page h1 is the product name in the banner (one h1 per page)
function H1({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-semibold tracking-tight text-2xl sm:text-3xl text-foreground mb-4 sm:mb-6">
      {children}
    </h2>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-semibold tracking-tight text-lg sm:text-xl text-foreground mt-10 mb-4 flex items-center gap-3">
      <span className="w-2 h-2 rounded-sm bg-primary shrink-0" />
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base sm:text-lg font-semibold text-foreground mt-6 mb-3">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm sm:text-base text-foreground/80 mb-4 leading-relaxed">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="mb-6 space-y-2.5">{children}</ul>;
}

function OL({ children }: { children: React.ReactNode }) {
  return <ol className="mb-6 space-y-2.5">{children}</ol>;
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm sm:text-base text-foreground/80">
      <span className="w-1 h-1 rounded-full bg-primary/70 mt-2.5 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function OLI({ children, num }: { children: React.ReactNode; num: number }) {
  return (
    <li className="flex items-start gap-3 text-sm sm:text-base text-foreground/80">
      <span className="font-mono text-xs text-primary mt-1 w-5 shrink-0">{String(num).padStart(2, "0")}</span>
      <span>{children}</span>
    </li>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="text-foreground font-semibold">{children}</strong>;
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 p-4 rounded-md border border-primary/20 border-l-2 border-l-primary bg-primary/5">
      <p className="text-sm sm:text-base text-foreground/80">{children}</p>
    </blockquote>
  );
}

function FeatureCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card mb-3">
      <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1.5">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 rounded bg-primary/15 text-primary font-semibold text-sm">
      {children}
    </span>
  );
}

const contentMap: Record<string, React.FC> = {
  feen: FeenContent,
  bumpi: FeenMarketingContent,
  "company-data": FeenLookupContent,
  syncco: FeenLeadContent,
  "pixl-branding": FeenBrandingContent,
  "pixl-web": FeenWebContent,
  custom: CustomContent,
};

interface FeatureItem {
  title: string;
  text: string;
}

interface StepItem {
  step: number;
  title: string;
  text: string;
}

function FeenContent() {
  const { tObject } = useLanguage();
  const content = tObject<{
    aboutTitle: string;
    aboutText: string;
    whatDoesTitle: string;
    whatDoesIntro: string;
    features: FeatureItem[];
    keyFeaturesTitle: string;
    peppolTitle: string;
    peppolText: string;
    multiLangTitle: string;
    multiLangText: string;
    pricingTitle: string;
    pricingText: string;
    pricingAmount: string;
    whoIsItForTitle: string;
    whoIsItFor: FeatureItem[];
    securityTitle: string;
    securityText: string;
  }>("products.feen.content");

  if (!content) return null;

  return (
    <>
      <H1>{content.aboutTitle}</H1>
      <P>
        {content.aboutText.split("AI-powered accounting companion").map((part, i) =>
          i === 0 ? part : <React.Fragment key={i}><Strong>AI-powered accounting companion</Strong>{part}</React.Fragment>
        )}
      </P>

      <H2>{content.whatDoesTitle}</H2>
      <P>{content.whatDoesIntro}</P>
      <UL>
        {content.features?.map((feature, i) => (
          <LI key={i}><Strong>{feature.title}</Strong> — {feature.text}</LI>
        ))}
      </UL>

      <H2>{content.keyFeaturesTitle}</H2>

      <FeatureCard title={content.peppolTitle}>
        {content.peppolText}
      </FeatureCard>

      <FeatureCard title={content.multiLangTitle}>
        {content.multiLangText}
      </FeatureCard>

      <FeatureCard title={content.pricingTitle}>
        <Highlight>{content.pricingAmount}</Highlight> {content.pricingText}
      </FeatureCard>

      <H2>{content.whoIsItForTitle}</H2>
      <UL>
        {content.whoIsItFor?.map((item, i) => (
          <LI key={i}><Strong>{item.title}</Strong> {item.text}</LI>
        ))}
      </UL>

      <H2>{content.securityTitle}</H2>
      <P>{content.securityText}</P>
    </>
  );
}

function FeenMarketingContent() {
  const { tObject } = useLanguage();
  const content = tObject<{
    aboutTitle: string;
    aboutText: string;
    whatDoesTitle: string;
    whatDoesIntro: string;
    features: FeatureItem[];
    howItWorksTitle: string;
    howItWorks: StepItem[];
    keyFeaturesTitle: string;
    multilingualTitle: string;
    multilingualText: string;
    brandTitle: string;
    brandText: string;
    timeTitle: string;
    timeText: string;
  }>("products.bumpi.content");

  if (!content) return null;

  return (
    <>
      <H1>{content.aboutTitle}</H1>
      <P>
        {content.aboutText.split("AI-powered content studio").map((part, i) =>
          i === 0 ? part : <React.Fragment key={i}><Strong>AI-powered content studio</Strong>{part}</React.Fragment>
        )}
      </P>

      <H2>{content.whatDoesTitle}</H2>
      <P>{content.whatDoesIntro}</P>
      <UL>
        {content.features?.map((feature, i) => (
          <LI key={i}><Strong>{feature.title}</Strong> — {feature.text}</LI>
        ))}
      </UL>

      <H2>{content.howItWorksTitle}</H2>
      <OL>
        {content.howItWorks?.map((step) => (
          <OLI key={step.step} num={step.step}><Strong>{step.title}</Strong> — {step.text}</OLI>
        ))}
      </OL>

      <H2>{content.keyFeaturesTitle}</H2>

      <FeatureCard title={content.multilingualTitle}>
        {content.multilingualText}
      </FeatureCard>

      <FeatureCard title={content.brandTitle}>
        {content.brandText}
      </FeatureCard>

      <FeatureCard title={content.timeTitle}>
        {content.timeText}
      </FeatureCard>
    </>
  );
}

function FeenLookupContent() {
  const { tObject } = useLanguage();
  const content = tObject<{
    aboutTitle: string;
    aboutText: string;
    whatDoesTitle: string;
    whatDoesIntro: string;
    features: FeatureItem[];
    useCasesTitle: string;
    useCases: FeatureItem[];
    dataSourcesTitle: string;
    dataSourcesText: string;
  }>("products.companyData.content");

  if (!content) return null;

  return (
    <>
      <H1>{content.aboutTitle}</H1>
      <P>
        {content.aboutText.split("company intelligence tool").map((part, i) =>
          i === 0 ? part : <React.Fragment key={i}><Strong>company intelligence tool</Strong>{part}</React.Fragment>
        )}
      </P>

      <VatLookupInput />

      <H2>{content.whatDoesTitle}</H2>
      <P>{content.whatDoesIntro}</P>
      <UL>
        {content.features?.map((feature, i) => (
          <LI key={i}><Strong>{feature.title}</Strong> — {feature.text}</LI>
        ))}
      </UL>

      <H2>{content.useCasesTitle}</H2>
      {content.useCases?.map((useCase, i) => (
        <FeatureCard key={i} title={useCase.title}>
          {useCase.text}
        </FeatureCard>
      ))}

      <H2>{content.dataSourcesTitle}</H2>
      <P>{content.dataSourcesText}</P>
    </>
  );
}

function FeenLeadContent() {
  const { tObject } = useLanguage();
  const content = tObject<{
    aboutTitle: string;
    aboutText: string;
    whatWillDoTitle: string;
    whatWillDoIntro: string;
    features: FeatureItem[];
    plannedFeaturesTitle: string;
    belgianFocusTitle: string;
    belgianFocusText: string;
    aiScoringTitle: string;
    aiScoringText: string;
    currentStatusTitle: string;
    currentStatusText: string;
    earlyAccessTitle: string;
    earlyAccessText: string;
  }>("products.syncco.content");

  if (!content) return null;

  return (
    <>
      <H1>{content.aboutTitle}</H1>
      <P>
        {content.aboutText.split("compliance watchdog").map((part, i) =>
          i === 0 ? part : <React.Fragment key={i}><Strong>intelligent prospection assistant</Strong>{part}</React.Fragment>
        )}
      </P>

      <H2>{content.whatWillDoTitle}</H2>
      <P>{content.whatWillDoIntro}</P>
      <UL>
        {content.features?.map((feature, i) => (
          <LI key={i}><Strong>{feature.title}</Strong> — {feature.text}</LI>
        ))}
      </UL>

      <H2>{content.plannedFeaturesTitle}</H2>

      <FeatureCard title={content.belgianFocusTitle}>
        {content.belgianFocusText}
      </FeatureCard>

      <FeatureCard title={content.aiScoringTitle}>
        {content.aiScoringText}
      </FeatureCard>

      <H2>{content.currentStatusTitle}</H2>
      <P>{content.currentStatusText}</P>

      <Quote>
        <Strong>{content.earlyAccessTitle}</Strong> {content.earlyAccessText}
      </Quote>
    </>
  );
}

function FeenBrandingContent() {
  const { tObject } = useLanguage();
  const content = tObject<{
    aboutTitle: string;
    aboutText: string;
    whatWillDoTitle: string;
    features: FeatureItem[];
    currentStatusTitle: string;
    currentStatusText: string;
    haveIdeasTitle: string;
    haveIdeasText: string;
  }>("products.pixlBranding.content");

  if (!content) return null;

  return (
    <>
      <H1>{content.aboutTitle}</H1>
      <P>
        {content.aboutText.split("AI-powered brand studio").map((part, i) =>
          i === 0 ? part : <React.Fragment key={i}><Strong>AI-powered brand studio</Strong>{part}</React.Fragment>
        )}
      </P>

      <H2>{content.whatWillDoTitle}</H2>
      <UL>
        {content.features?.map((feature, i) => (
          <LI key={i}><Strong>{feature.title}</Strong> — {feature.text}</LI>
        ))}
      </UL>

      <H2>{content.currentStatusTitle}</H2>
      <P>{content.currentStatusText}</P>

      <Quote>
        <Strong>{content.haveIdeasTitle}</Strong> {content.haveIdeasText}
      </Quote>
    </>
  );
}

function FeenWebContent() {
  const { tObject } = useLanguage();
  const content = tObject<{
    aboutTitle: string;
    aboutText: string;
    whatWillDoTitle: string;
    features: FeatureItem[];
    ecosystemTitle: string;
    ecosystemText: string;
    currentStatusTitle: string;
    currentStatusText: string;
  }>("products.pixlWeb.content");

  if (!content) return null;

  return (
    <>
      <H1>{content.aboutTitle}</H1>
      <P>
        {content.aboutText.split("no-code website builder").map((part, i) =>
          i === 0 ? part : <React.Fragment key={i}><Strong>no-code website builder</Strong>{part}</React.Fragment>
        )}
      </P>

      <H2>{content.whatWillDoTitle}</H2>
      <UL>
        {content.features?.map((feature, i) => (
          <LI key={i}><Strong>{feature.title}</Strong> — {feature.text}</LI>
        ))}
      </UL>

      <H2>{content.ecosystemTitle}</H2>
      <P>{content.ecosystemText}</P>

      <H2>{content.currentStatusTitle}</H2>
      <P>{content.currentStatusText}</P>
    </>
  );
}

function CustomContent() {
  const { tObject } = useLanguage();
  const content = tObject<{
    buildTitle: string;
    buildIntro: string;
    whatWeOfferTitle: string;
    whatWeOfferText: string;
    customDevTitle: string;
    customDevFeatures: FeatureItem[];
    approachTitle: string;
    approachSteps: StepItem[];
    whyChooseTitle: string;
    whyChooseReasons: FeatureItem[];
  }>("products.custom.content");

  if (!content) return null;

  return (
    <>
      <H1>{content.buildTitle}</H1>
      <P>{content.buildIntro}</P>

      <H2>{content.whatWeOfferTitle}</H2>
      <P>
        {content.whatWeOfferText.split("builders").map((part, i) =>
          i === 0 ? part : <React.Fragment key={i}><Strong>builders</Strong>{part}</React.Fragment>
        )}
      </P>

      <H3>{content.customDevTitle}</H3>
      <UL>
        {content.customDevFeatures?.map((feature, i) => (
          <LI key={i}><Strong>{feature.title}</Strong> — {feature.text}</LI>
        ))}
      </UL>

      <H2>{content.approachTitle}</H2>
      <OL>
        {content.approachSteps?.map((step) => (
          <OLI key={step.step} num={step.step}><Strong>{step.title}</Strong> — {step.text}</OLI>
        ))}
      </OL>

      <H2>{content.whyChooseTitle}</H2>
      <UL>
        {content.whyChooseReasons?.map((reason, i) => (
          <LI key={i}><Strong>{reason.title}</Strong> — {reason.text}</LI>
        ))}
      </UL>
    </>
  );
}
