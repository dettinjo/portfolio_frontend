"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Link } from "@/i18n/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { MobileNav } from "./MobileHeader";
import { Camera } from "lucide-react";

export function PhotographyHeader() {
  const t = useTranslations("PhotographyHeader");
  const { resolvedTheme } = useTheme();
  const avatarSrc =
    resolvedTheme === "dark"
      ? "/images/avatar-dark.png"
      : "/images/avatar-light.png";

  const navLinks = [
    { href: "#galerien", label: t("galleries") },
    { href: "#services", label: t("services") },
    { href: "#kontakt", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between">
        <Link
          href="/photography"
          className="flex items-center gap-3 font-bold text-lg" // Adjusted gap for better spacing
        >
          <Camera className="h-6 w-6" />
          {/* <span>Photos by Joel</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarSrc} alt="Your Name" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar> */}
        </Link>

        {/* Desktop Navigation remains the same */}
        <div className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* --- THE FIX IS HERE --- */}
        <div className="flex items-center gap-2">
          {/* These toggles are only visible on desktop */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          {/* The MobileNav is only visible on mobile */}
          <MobileNav navLinks={navLinks}>
            <LanguageToggle />
            <ThemeToggle />
          </MobileNav>
        </div>
      </nav>
    </header>
  );
}
