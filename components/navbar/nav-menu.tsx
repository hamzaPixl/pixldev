"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export const NavMenu = (props: NavigationMenuProps) => {
  const { t } = useLanguage();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#about"
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.about")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#core-values"
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.coreValues")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#capabilities"
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.capabilities")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#case-studies"
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.caseStudies")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#faq"
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.faq")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#contact"
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.contact")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
