// This is a clean Server Component. It has no "use client" directive.
import { getTranslations } from "next-intl/server";
import { SkillsGrid } from "./SkillsGrid";
import { ProficiencyLegend } from "@/components/ProficiencyLegend";

// Interface definitions for the data it will receive from the page
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

// The component is async so it can fetch its own translations
export async function SkillsSection({ skills }: SkillsSectionProps) {
  // It fetches ONLY the translations it is directly responsible for.
  const t = await getTranslations("SoftwareSkillsSection");

  return (
    <section id="skills">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>
      <SkillsGrid skills={skills} />
      <div className="mt-16">
        <ProficiencyLegend />
      </div>
    </section>
  );
}
