import { Separator } from "@/components/ui/separator";
import { LinkedinIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "./navbar/logo";
import { LanguageSwitcher } from "@/components/language-switcher";

const footerLinks = [
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Case Studies",
    href: "#case-studies",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const Footer = () => {
  return (
    <footer className="border-t mt-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="py-12 flex flex-col md:flex-row items-start justify-between gap-x-8 gap-y-10 px-6">
          <div className="flex-1">
            {/* Logo */}
            <Logo />
            
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Pixl SRL</strong></p>
              <p>TVA: BE 0805.449.693</p>
              <p>Email: <Link href="mailto:contact@pixldev.be" className="hover:text-pixl-teal transition-colors">contact@pixldev.be</Link></p>
              <p>Phone: <Link href="tel:+32488203567" className="hover:text-pixl-teal transition-colors">+32 488 20 35 67</Link></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-12 gap-y-6">
            {/* Links */}
            <div>
              <h6 className="font-semibold mb-4 text-sm">Links</h6>
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
              <h6 className="font-semibold mb-4 text-sm">Language</h6>
              <LanguageSwitcher variant="full" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
          {/* Copyright */}
          <span className="text-sm text-muted-foreground text-center sm:text-start">
            &copy; {new Date().getFullYear()} Pixl SRL. All rights reserved.
          </span>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link 
              href="https://linkedin.com/company/pixl-dev" 
              target="_blank"
              className="hover:text-pixl-teal transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </Link>
            <Link 
              href="https://twitter.com/pixldev" 
              target="_blank"
              className="hover:text-pixl-teal transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
