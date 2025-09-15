"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl"; // 1. Import the translation hook

export function HeroSection() {
  const t = useTranslations("SoftwareHeroSection"); // 2. Initialize the hook with our new namespace
  const { resolvedTheme } = useTheme();

  const avatarSrc =
    resolvedTheme === "dark"
      ? "/images/avatar-dark.png"
      : "/images/avatar-light.png";

  return (
    <section
      id="hero"
      className="container mx-auto flex min-h-screen items-center justify-center py-24"
    >
      <div className="grid grid-cols-1 items-center gap-12 text-center md:grid-cols-2 md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 3. Replace hardcoded text with calls to the translation function `t()` */}
          <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
            {t("greeting")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("intro")}
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Avatar className="h-64 w-64 border-4 border-foreground md:h-80 md:w-80">
            <AvatarImage src={avatarSrc} alt="Profile picture of [Your Name]" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </motion.div>
      </div>
    </section>
  );
}
