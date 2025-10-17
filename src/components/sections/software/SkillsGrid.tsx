"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillIcon } from "@/components/SkillIcon";
import { ProficiencyDots } from "@/components/ProficiencyDots";
import { Separator } from "@/components/ui/separator";

interface Skill {
  name: string;
  iconClassName: string | null;
  level: number;
  url: string;
  svgIcon?: {
    url: string;
    alternativeText?: string;
  } | null;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillsGridProps {
  skills: SkillCategory[];
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  if (!skills || skills.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No skills are currently available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {skills.map((category: SkillCategory, index: number) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
        >
          <Card className="h-full border-0 shadow-none bg-transparent hover:shadow-none flex flex-col items-center">
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="text-2xl text-center transition-colors duration-300 group-data-[active=true]:text-background">
                {category.category}
              </CardTitle>
            </CardHeader>

            <Separator className="w-2/4 mx-auto group-data-[active=true]:bg-background/20" />
            <CardContent className="w-full p-0 flex justify-center">
              <div className="inline-grid grid-cols-3 gap-0">
                {category.skills.map((skill: Skill) => (
                  <div
                    key={skill.name}
                    className="relative group/skill h-12 w-12 flex items-center justify-center"
                  >
                    <motion.a
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center justify-center rounded-lg transition-all duration-200 group-hover/skill:bg-foreground group-hover/skill:px-3 group-hover/skill:py-2 group-hover/skill:shadow-lg group-data-[active=true]:group-hover/skill:bg-background"
                      style={{ transformOrigin: "center center" }}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <SkillIcon
                          iconClassName={skill.iconClassName}
                          svgIconUrl={skill.svgIcon?.url}
                          altText={skill.name}
                          className="h-8 w-8 flex shrink-0 items-center justify-center text-2xl text-foreground transition-colors duration-200 group-hover/skill:text-background group-data-[active=true]:text-background group-data-[active=true]:group-hover/skill:text-foreground [&>svg]:h-7 [&>svg]:w-7"
                        />

                        {/* Title and level - hidden by default, shown on hover */}
                        <div className="hidden group-hover/skill:flex flex-col items-center gap-1">
                          <span className="whitespace-nowrap block text-center text-xs font-semibold text-background group-data-[active=true]:text-foreground">
                            {skill.name}
                          </span>
                          <div className="[&>div]:text-background [&>div>div]:bg-background group-data-[active=true]:[&>div]:text-foreground group-data-[active=true]:[&>div>div]:bg-foreground">
                            <ProficiencyDots level={skill.level} />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
