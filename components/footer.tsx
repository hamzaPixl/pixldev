"use client";

import { Separator } from "@/components/ui/separator";
import { LinkedinIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "./navbar/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    {
      title: t("navigation.about"),
      href: "#about",
    },
    {
      title: t("navigation.coreValues"),
      href: "#core-values",
    },
    {
      title: t("navigation.capabilities"),
      href: "#capabilities",
    },
    {
      title: t("navigation.caseStudies"),
      href: "#case-studies",
    },
    {
      title: t("navigation.faq"),
      href: "#faq",
    },
    {
      title: t("navigation.contact"),
      href: "#contact",
    },
  ];

  return (
    <footer className="border-t mt-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="py-12 flex flex-col md:flex-row items-start justify-between gap-x-8 gap-y-10 px-6">
          <div className="flex-1">
            {/* Logo */}
            <Logo />

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">
                  {t("footer.companyInfo.name")}
                </strong>
              </p>
              <p>{t("footer.companyInfo.vatNumber")}</p>
              <p>
                Email:{" "}
                <Link
                  href={`mailto:${t("footer.companyInfo.email")}`}
                  className="hover:text-pixl-teal transition-colors"
                >
                  {t("footer.companyInfo.email")}
                </Link>
              </p>
              <p>
                Phone:{" "}
                <Link
                  href={`tel:${t("footer.companyInfo.phone")}`}
                  className="hover:text-pixl-teal transition-colors"
                >
                  {t("footer.companyInfo.phone")}
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-12 gap-y-6">
            {/* Links */}
            <div>
              <h6 className="font-semibold mb-4 text-sm">
                {t("common.links")}
              </h6>
              <ul className="space-y-2">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-pixl-teal transition-colors"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Language Switcher */}
            <div>
              <h6 className="font-semibold mb-4 text-sm">
                {t("common.language")}
              </h6>
              <LanguageSwitcher variant="full" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
          {/* Copyright */}
          <span className="text-sm text-muted-foreground text-center sm:text-start">
            &copy; {new Date().getFullYear()} {t("footer.companyInfo.name")}.{" "}
            {t("footer.copyright")}
          </span>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link
              href="https://www.linkedin.com/company/pixl-srl"
              target="_blank"
              className="hover:text-pixl-teal transition-colors"
              aria-label={t("footer.socialLinks.linkedinLabel")}
            >
              <LinkedinIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
