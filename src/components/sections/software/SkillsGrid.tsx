"use client"; // This MUST be a client component for Framer Motion.

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow, Server, Code } from "lucide-react";
import { ProficiencyDots } from "@/components/ProficiencyDots";
import { useTranslations } from "next-intl"; // The correct hook for Client Components

// Interface definitions for the data it receives as props
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
interface SkillsGridProps {
  skills: SkillCategory[];
}

// Helper object for mapping category names to icons
const categoryDetails = {
  Frontend: { icon: <Code className="h-8 w-8 text-foreground" /> },
  Backend: { icon: <Server className="h-8 w-8 text-foreground" /> },
  DevOps: { icon: <Workflow className="h-8 w-8 text-foreground" /> },
};

// This component no longer receives a `translations` prop.
export function SkillsGrid({ skills }: SkillsGridProps) {
  // It fetches ONLY the translations it needs using the client-side hook.
  const t = useTranslations("SoftwareSkillsSection");

  // Helper function to get the translated category title
  const getCategoryTitle = (category: string) => {
    if (category === "Frontend") return t("category_frontend");
    if (category === "Backend") return t("category_backend");
    if (category === "DevOps & Tools") return t("category_devops");
    return category;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mx-6">
      {skills.map((category: SkillCategory, index: number) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full border-0 shadow-none bg-transparent hover:shadow-none flex flex-col gap-4">
            <CardHeader>
              <div className="flex items-center gap-4">
                {
                  categoryDetails[
                    category.category as keyof typeof categoryDetails
                  ]?.icon
                }
                <CardTitle className="text-2xl">
                  {getCategoryTitle(category.category)}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {category.skills.map((skill: Skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg border-2 border-foreground p-3 transition-colors duration-200 hover:bg-foreground"
                  >
                    <div className="flex items-center gap-3">
                      <i
                        className={`${skill.iconClassName} text-2xl text-foreground transition-colors duration-200 group-hover:text-background`}
                      ></i>
                      <span className="font-semibold text-foreground transition-colors duration-200 group-hover:text-background">
                        {skill.name}
                      </span>
                    </div>
                    <ProficiencyDots level={skill.level} />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
