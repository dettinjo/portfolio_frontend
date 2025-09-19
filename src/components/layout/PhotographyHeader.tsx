"use client";

import { useState, useEffect } from "react"; // 1. Add useEffect
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Link } from "@/i18n/navigation";
import { MobileNav } from "./MobileHeader";
import { Camera } from "lucide-react";

export function PhotographyHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const headerHeight = "56px"; // h-14 = 3.5rem = 56px

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // --- THIS IS THE FIX (PART 1) ---
  // 2. This effect communicates the header's state to the CSS.
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-offset",
      hidden ? "0px" : headerHeight
    );
  }, [hidden]);
  // --- END OF FIX ---

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 z-50 w-full bg-background"
    >
      <nav className="container mx-auto flex h-14 items-center justify-between">
        <Link
          href="/photography"
          className="flex items-center gap-3 font-bold text-lg"
        >
          <Camera className="h-6 w-6" />
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <MobileNav>
            <LanguageToggle />
            <ThemeToggle />
          </MobileNav>
        </div>
      </nav>
    </motion.header>
  );
}
