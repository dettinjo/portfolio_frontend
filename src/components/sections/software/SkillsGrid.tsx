"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProficiencyDots } from "@/components/ProficiencyDots";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

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

// ...existing code...

export function SkillsGrid({ skills }: SkillsGridProps) {
  const t = useTranslations("software.SoftwareSkillsSection");

  if (!skills || skills.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No skills are currently available.
      </p>
    );
  }

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
            <CardHeader className="flex justify-center items-center">
              {/* --- THIS IS THE FIX --- */}
              <CardTitle className="text-2xl text-center transition-colors duration-300 group-data-[active=true]:text-background">
                {getCategoryTitle(category.category)}
              </CardTitle>
            </CardHeader>

            <Separator className="w-2/4 mx-auto group-data-[active=true]:bg-background/20" />

            <CardContent>
              <div className="flex flex-col">
                {category.skills.map((skill: Skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    // --- THIS IS THE FIX ---
                    className="group/item flex cursor-pointer items-center justify-between gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-foreground group-data-[active=true]:hover:bg-background"
                  >
                    <div className="flex items-center gap-3">
                      <i
                        // --- THIS IS THE FIX ---
                        className={`${skill.iconClassName} text-2xl text-foreground transition-colors duration-200 group-hover/item:text-background group-data-[active=true]:text-background group-data-[active=true]:group-hover/item:text-foreground`}
                      ></i>
                      <span
                        // --- THIS IS THE FIX ---
                        className="font-semibold text-foreground transition-colors duration-200 group-hover/item:text-background group-data-[active=true]:text-background group-data-[active=true]:group-hover/item:text-foreground"
                      >
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
// ...existing code...
