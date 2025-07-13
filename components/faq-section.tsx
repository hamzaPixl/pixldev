"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";

export interface FaqItem {
  questionKey: string;
  answerKey: string;
}

export interface FaqSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
}

const pixlFaqs: FaqItem[] = [
  {
    questionKey: "faq.items.howDeliver.question",
    answerKey: "faq.items.howDeliver.answer",
  },
  {
    questionKey: "faq.items.keySteps.question",
    answerKey: "faq.items.keySteps.answer",
  },
  {
    questionKey: "faq.items.measureSuccess.question",
    answerKey: "faq.items.measureSuccess.answer",
  },
];

const FaqSection = ({
  badge,
  heading,
  description,
  faqs = pixlFaqs,
}: FaqSectionProps) => {
  const { t } = useLanguage();

  // Use translations for default values
  const defaultBadge = badge || t("faq.badge");
  const defaultHeading = heading || t("faq.title");
  const defaultDescription = description || t("faq.description");
  return (
    <section id="faq" className="w-full py-16 xs:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="text-xs font-semibold bg-pixl-teal/10 text-pixl-teal border border-pixl-teal/20 hover:bg-pixl-teal/20 mb-4">
            {defaultBadge}
          </Badge>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {defaultHeading}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {defaultDescription}
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 hover:border-pixl-teal/30 hover:bg-card/20 transition-all duration-300 p-6"
            >
              <div className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-pixl-teal/10 border border-pixl-teal/20 group-hover:bg-pixl-teal/20 transition-all duration-300 font-mono text-sm font-semibold text-pixl-teal">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-pixl-teal transition-colors duration-300">
                    {t(faq.questionKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(faq.answerKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-pixl-teal hover:text-black dark:hover:text-white font-medium transition-colors duration-300"
          >
            {t("faq.getInTouch")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
