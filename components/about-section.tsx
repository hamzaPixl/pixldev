"use client";

import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/scroll-animation";
import { useLanguage } from "@/lib/language-context";

interface AboutSectionProps {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    onClick?: () => void;
  };
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const pixlAchievements = [
  { label: "about.achievements.items.projectsDelivered", value: "50+" },
  { label: "about.achievements.items.timeSaved", value: "10,000+" },
  { label: "about.achievements.items.clientSatisfaction", value: "95%" },
  { label: "about.achievements.items.efficiencyGain", value: "60%" },
];

const AboutSection = ({
  title,
  description,
  mainImage,
  breakout,
  achievementsTitle,
  achievementsDescription,
  achievements = pixlAchievements,
}: AboutSectionProps = {}) => {
  const { t } = useLanguage();

  // Default values using translations
  const defaultTitle = title || t("about.title");
  const defaultDescription = description || t("about.description");
  const defaultMainImage = mainImage || {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format",
    alt: t("about.mainImage.alt"),
  };
  const defaultBreakout = breakout || {
    src: "/favicon-32x32.png",
    alt: "Pixl logo",
    title: t("about.breakout.title"),
    description: t("about.breakout.description"),
    buttonText: t("common.startProject"),
    onClick: () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    },
  };
  const defaultAchievementsTitle =
    achievementsTitle || t("about.achievements.title");
  const defaultAchievementsDescription =
    achievementsDescription || t("about.achievements.description");

  return (
    <section id="about" className="w-full py-16 xs:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation
          direction="up"
          className="mb-16 grid gap-8 text-center md:grid-cols-2 md:text-left md:items-end"
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            {defaultTitle}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {defaultDescription}
          </p>
        </ScrollAnimation>

        <ScrollAnimation
          direction="up"
          delay={200}
          className="grid gap-6 lg:grid-cols-3 mb-16"
        >
          <img
            src={defaultMainImage.src}
            alt={defaultMainImage.alt}
            className="size-full max-h-[400px] lg:max-h-[500px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-6 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 p-6 md:w-1/2 lg:w-auto">
              <div>
                <p className="mb-3 text-lg font-bold text-foreground">
                  {defaultBreakout.title}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {defaultBreakout.description}
                </p>
              </div>
              <Button
                variant="outline"
                className="mr-auto border-pixl-teal/40 text-pixl-teal hover:bg-pixl-teal/10 hover:text-black dark:hover:text-white hover:border-pixl-teal/60 rounded-full"
                onClick={defaultBreakout.onClick}
              >
                {defaultBreakout.buttonText}
              </Button>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 p-6 md:w-1/2 lg:w-auto">
              <div>
                <p className="mb-3 text-lg font-bold text-foreground">
                  {t("about.expertCraftsmanship.title")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.expertCraftsmanship.description")}
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation
          direction="up"
          delay={400}
          className="relative overflow-hidden rounded-xl bg-card/10 backdrop-blur-lg border border-border/20 p-8 md:p-12"
        >
          <div className="flex flex-col gap-4 text-center md:text-left mb-10">
            <h3 className="text-3xl xs:text-4xl font-bold text-foreground">
              {defaultAchievementsTitle}
            </h3>
            <p className="max-w-2xl text-muted-foreground leading-relaxed">
              {defaultAchievementsDescription}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-3" key={item.label + idx}>
                <span className="text-3xl md:text-4xl font-bold text-pixl-teal">
                  {item.value}
                </span>
                <p className="text-sm font-medium text-muted-foreground">
                  {t(item.label)}
                </p>
              </div>
            ))}
          </div>

          {/* Subtle pattern overlay */}
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] bg-[size:60px_60px] opacity-20 md:block"></div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default AboutSection;
