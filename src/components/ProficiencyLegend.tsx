// src/components/ProficiencyLegend.tsx
"use client";

import { useTranslations } from "next-intl";
import { ProficiencyBar } from "./ProficiencyBar";

export function ProficiencyLegend() {
  const t = useTranslations("software.SoftwareSkillsSection");

  return (
    <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
      <span>{t("legend_beginner")}</span>
      {/* We apply override styles here to make the bar visible on the page background */}
      <div className="[&>div]:bg-muted [&>div>div]:bg-foreground">
        <ProficiencyBar level={5} />
      </div>
      <span>{t("legend_expert")}</span>
    </div>
  );
}
