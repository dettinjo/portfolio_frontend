// File: frontend/src/components/ProficiencyLegend.tsx
"use client";

import { useTranslations } from "next-intl";
import { ProficiencyDots } from "./ProficiencyDots";

export function ProficiencyLegend() {
  const t = useTranslations("software.SoftwareSkillsSection");

  return (
    <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
      <span>{t("legend_beginner")}</span>
      <ProficiencyDots level={5} />
      <span>{t("legend_expert")}</span>
    </div>
  );
}
