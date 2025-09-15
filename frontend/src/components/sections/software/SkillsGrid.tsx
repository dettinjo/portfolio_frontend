"use client"; // This component MUST be a client component to use hooks

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Server, Code } from "lucide-react";
import { ProficiencyDots } from "@/components/ProficiencyDots";
import React, { useState } from "react";
import { useTheme } from "next-themes";

// Interface definitions...
interface Skill {
  name: string;
  iconClassName: string;
  level: number;
}
interface SkillCategory {
  category: string;
  skills: Skill[];
}
interface SkillsGridProps {
  skills: SkillCategory[];
  translations: any;
}

const categoryDetails = {
  /* ... */
};

export function SkillsGrid({ skills, translations }: SkillsGridProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  // --- DEFINITIVE COLOR PALETTE ---
  // These literal color values are our source of truth.
  // IMPORTANT: Ensure these HSL values match your theme in `globals.css`.
  const colors = {
    light: {
      background: "hsl(240 10% 98%)", // Off-White paper
      foreground: "hsl(240 10% 10%)", // Dark ink
      muted: "hsl(240 5% 90%)", // Light gray for empty dots
    },
    dark: {
      background: "hsl(240 10% 10%)", // Dark slate
      foreground: "hsl(240 10% 98%)", // Light chalk
      muted: "hsl(240 5% 30%)", // Dark gray for empty dots
    },
  };

  // Select the correct color palette based on the current theme
  const currentTheme = resolvedTheme === "dark" ? colors.dark : colors.light;

  const getCategoryTitle = (category: string) => {
    /* ... */
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {skills.map((category: any, index: number) => (
        <motion.div key={category.category} /* ... */>
          <Card className="h-full border-0 shadow-none bg-transparent hover:shadow-none">
            <CardHeader>{/* ... */}</CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {category.skills.map((skill: any) => {
                  const isHovered = hoveredSkill === skill.name;

                  // --- BRUTE-FORCE STYLE CALCULATION ---
                  const pillStyle = {
                    backgroundColor: isHovered
                      ? currentTheme.foreground
                      : "transparent",
                    borderColor: currentTheme.foreground,
                  };

                  const textAndIconStyle = {
                    color: isHovered
                      ? currentTheme.background
                      : currentTheme.foreground,
                  };

                  const dotColors = {
                    filledColor: isHovered
                      ? currentTheme.background
                      : currentTheme.foreground,
                    emptyColor: isHovered
                      ? `${currentTheme.background}50`
                      : currentTheme.muted, // Add 30% opacity for hovered empty dots
                  };

                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border-2 p-3 transition-colors duration-200"
                      // We apply the calculated styles directly, bypassing all CSS classes
                      style={pillStyle}
                    >
                      <div className="flex items-center gap-3">
                        <i
                          className={`${skill.iconClassName} text-2xl`}
                          style={textAndIconStyle}
                        />
                        <span
                          className="font-semibold"
                          style={textAndIconStyle}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <ProficiencyDots
                        level={skill.level}
                        // Pass the calculated colors down to the dumb component
                        filledColor={dotColors.filledColor}
                        emptyColor={dotColors.emptyColor}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
