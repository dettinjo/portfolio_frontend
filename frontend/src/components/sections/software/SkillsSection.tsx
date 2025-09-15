// NO "use client" - This is now a clean Server Component.
import { getTranslations } from "next-intl/server";
import { SkillsGrid } from "./SkillsGrid"; // Import our new client component

// Interface definitions remain the same
interface Skill {
  name: string;
  iconClassName: string;
  level: number;
}
interface SkillCategory {
  category: string;
  skills: Skill[];
}
interface SkillsSectionProps {
  skills: SkillCategory[];
}

export async function SkillsSection({ skills }: SkillsSectionProps) {
  // We can safely use `await` here because this is a Server Component.
  const t = await getTranslations("SoftwareSkillsSection");

  // We prepare the translations to pass down to the client component.
  const translations = {
    category_frontend: t("category_frontend"),
    category_backend: t("category_backend"),
    category_devops: t("category_devops"),
  };

  return (
    <section id="skills" className="container mx-auto py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* We render the client component and pass the data and translations as props. */}
      <SkillsGrid skills={skills} translations={translations} />
    </section>
  );
}
