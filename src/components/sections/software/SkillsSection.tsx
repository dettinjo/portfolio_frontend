"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";
import { SkillsGrid } from "./SkillsGrid";
import { ProficiencyLegend } from "@/components/ProficiencyLegend";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  iconClassName: string;
  level: number;
  url: string;
}
interface SkillCategory {
  category: string;
  skills: Skill[];
}
interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const t = useTranslations("software.SoftwareSkillsSection");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsActive(latest > 0.2 && latest < 0.8);
  });

  return (
    <section id="skills" ref={sectionRef}>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <motion.div
        data-active={isActive}
        className={cn(
          "group rounded-xl p-8 md:p-12 transition-all duration-300",
          "data-[active=true]:bg-foreground"
        )}
        animate={{ scale: isActive ? 1.02 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <SkillsGrid skills={skills} />
      </motion.div>
    </section>
  );
}
