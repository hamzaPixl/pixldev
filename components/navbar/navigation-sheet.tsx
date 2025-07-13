"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
import ThemeToggle from "../theme-toggle";
import { useLanguage } from "@/lib/language-context";

export const NavigationSheet = () => {
  const { t } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only">
          {t("navigationSheet.title")}
        </SheetTitle>
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" />

        {/* Mobile Theme and Language Settings */}
        <div className="mt-8 flex items-center justify-between">
          <span className="text-sm font-medium">{t("common.settings")}</span>
          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="icon" />
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Button
            variant="outline"
            className="w-full border-pixl-teal/40 text-pixl-teal bg-pixl-teal/5 hover:bg-pixl-teal/15 hover:border-pixl-teal/60 hover:text-black dark:hover:text-white"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {t("common.contactUs")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
