// This is a clean Server Component. It has no "use client" directive.
import { getTranslations } from "next-intl/server";
import { SkillsGrid } from "./SkillsGrid";

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
    <section id="skills" className="container mx-auto py-32">
      <div className="text-center mb-16">
        {/* It renders its own translated text */}
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* It renders the Client Component, passing ONLY the raw skills data down. */}
      {/* It does NOT pass any functions or translations. */}
      <SkillsGrid skills={skills} />
    </section>
  );
}
