"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "../theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleContactClick = () => {
    if (isHomePage) {
      // If on home page, scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home page contact section
      window.location.href = "/#contact";
    }
  };

  return (
    <nav className="fixed z-50 top-6 inset-x-4 h-14 xs:h-16 bg-background/30 backdrop-blur-2xl border border-pixl-teal/20 shadow-xl shadow-pixl-teal/10 max-w-screen-xl mx-auto rounded-full before:absolute before:inset-0 before:bg-gradient-to-r before:from-pixl-teal/8 before:via-transparent before:to-pixl-teal/8 before:rounded-full before:-z-10">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {/* Desktop Only Items */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher variant="icon" />
            <ThemeToggle />
            <Button
              variant="outline"
              className="border-pixl-teal/40 text-pixl-teal bg-pixl-teal/5 hover:bg-pixl-teal/15 hover:border-pixl-teal/60 hover:text-black dark:hover:text-white rounded-full"
              onClick={handleContactClick}
            >
              {t("common.contactUs")}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
