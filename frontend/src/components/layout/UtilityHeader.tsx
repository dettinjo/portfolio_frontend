"use client";

import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Link } from "@/i18n/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

export function UtilityHeader() {
  const { resolvedTheme } = useTheme();

  const avatarSrc =
    resolvedTheme === "dark"
      ? "/images/avatar-dark.png"
      : "/images/avatar-light.png";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 items-center justify-between">
        {/* --- THE FIX IS HERE --- */}
        {/* We provide a simple root path '/', and the i18n Link component will
            automatically prepend the correct locale to it. */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarSrc} alt="Your profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
