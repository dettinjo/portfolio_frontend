"use client";

import { useTranslations } from "next-intl";
import { ProficiencyDots } from "./ProficiencyDots";

export function ProficiencyLegend() {
  const t = useTranslations("software.SoftwareSkillsSection");

  return (
    // --- THIS IS THE FIX ---
    <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground transition-colors duration-300 group-data-[active=true]:text-background/70">
      <span>{t("legend_beginner")}</span>
      <ProficiencyDots level={5} />
      <span>{t("legend_expert")}</span>
    </div>
  );
}
