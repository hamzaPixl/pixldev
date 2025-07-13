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
import { usePathname } from "next/navigation";

export const NavMenu = (props: NavigationMenuProps) => {
  const { t } = useLanguage();
  const pathname = usePathname();

  // Check if we're on the home page - if not, navigation should go to home page sections
  const isHomePage = pathname === "/";
  const getNavHref = (section: string) =>
    isHomePage ? `#${section}` : `/#${section}`;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={getNavHref("about")}
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.about")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={getNavHref("core-values")}
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.coreValues")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={getNavHref("capabilities")}
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.capabilities")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={getNavHref("case-studies")}
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.caseStudies")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={getNavHref("faq")}
              className="text-sm font-medium transition-colors text-foreground/90 hover:text-pixl-teal"
            >
              {t("navigation.faq")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={getNavHref("contact")}
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
