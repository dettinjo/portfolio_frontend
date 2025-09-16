"use client"; // This is a client component for Framer Motion.

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Server, Code } from "lucide-react";
import { ProficiencyDots } from "@/components/ProficiencyDots";

// Interface definitions for type safety
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
// Define the shape of the translations object we expect to receive
interface Translations {
  category_frontend: string;
  category_backend: string;
  category_devops: string;
}
interface SkillsGridProps {
  skills: SkillCategory[];
  translations: Translations;
}

// Helper object for mapping category names to icons
const categoryDetails = {
  Frontend: { icon: <Code className="h-8 w-8 text-foreground" /> },
  Backend: { icon: <Server className="h-8 w-8 text-foreground" /> },
  "DevOps & Tools": { icon: <Wrench className="h-8 w-8 text-foreground" /> },
};

export function SkillsGrid({ skills, translations }: SkillsGridProps) {
  // 1. This helper function is now corrected.
  // It correctly uses the `translations` prop to get the right string.
  const getCategoryTitle = (category: string) => {
    if (category === "Frontend") return translations.category_frontend;
    if (category === "Backend") return translations.category_backend;
    if (category === "DevOps & Tools") return translations.category_devops;
    return category; // Fallback to the original name if no match
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {skills.map((category: SkillCategory, index: number) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full border-0 shadow-none bg-transparent hover:shadow-none">
            <CardHeader>
              <div className="flex items-center gap-4">
                {categoryDetails[category.category]?.icon}
                <CardTitle className="text-2xl">
                  {/* 2. The corrected function is called here. */}
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
