// This is a clean Server Component. It has no "use client" directive.
import { getTranslations } from "next-intl/server";
import { SkillsGrid } from "./SkillsGrid"; // We import the client component

// Interface definitions...
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

export async function SkillsSection({ skills }: SkillsSectionProps) {
  // 1. We MUST use `await` here because this is a Server Component.
  const t = await getTranslations("SoftwareSkillsSection");

  // 2. We prepare the translations to pass down to the client component.
  // We call `t()` here to get the ACTUAL translated strings.
  const translationsForClient = {
    category_frontend: t("category_frontend"),
    category_backend: t("category_backend"),
    category_devops: t("category_devops"),
  };

  return (
    <section id="skills" className="container mx-auto py-32">
      <div className="text-center mb-16">
        {/* 3. We use the `t` function to render the title and subtitle. */}
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* We render the client component and pass the real data and translations down. */}
      <SkillsGrid skills={skills} translations={translationsForClient} />
    </section>
  );
}
