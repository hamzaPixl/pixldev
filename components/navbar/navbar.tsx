'use client';

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "../theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-6 inset-x-4 h-14 xs:h-16 bg-background/30 backdrop-blur-2xl border border-pixl-teal/20 shadow-xl shadow-pixl-teal/10 max-w-screen-xl mx-auto rounded-full before:absolute before:inset-0 before:bg-gradient-to-r before:from-pixl-teal/8 before:via-transparent before:to-pixl-teal/8 before:rounded-full before:-z-10">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="icon" />
          <ThemeToggle />
          <Button 
            variant="outline" 
            className="hidden xs:inline-flex border-pixl-teal/40 text-pixl-teal bg-pixl-teal/5 hover:bg-pixl-teal/15 hover:border-pixl-teal/60 hover:text-white"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Contact
          </Button>

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
