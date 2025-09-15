"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Link } from "@/i18n/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes"; // 1. Import the useTheme hook

export function PhotographyHeader() {
  const t = useTranslations("PhotographyHeader");
  // 2. Get the current theme.
  const { resolvedTheme } = useTheme();

  // 3. Determine the correct image source based on the theme.
  const avatarSrc =
    resolvedTheme === "dark"
      ? "/images/avatar-dark.png"
      : "/images/avatar-light.png";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between">
        <Link
          href="/photography"
          className="flex items-center gap-2 font-bold text-lg"
        >
          <span>Photos by</span>
          <Avatar className="h-8 w-8">
            {/* 4. Use the dynamic avatarSrc variable for the image source */}
            <AvatarImage src={avatarSrc} alt="Joel's profile picture" />
            <AvatarFallback>Joel</AvatarFallback>
          </Avatar>
        </Link>

        {/* ... (rest of the header remains the same) ... */}
        <div className="flex items-center gap-6 text-sm">
          <a href="#galerien" className="...">
            {t("galleries")}
          </a>
          <a href="#services" className="...">
            {t("services")}
          </a>
          <a href="#kontakt" className="...">
            {t("contact")}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
