// src/components/sections/software/ProjectsSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { SoftwareProject } from "@/lib/strapi";
// Import the new card component
import { AnimatedProjectCard } from "./AnimatedProjectCard";

interface ProjectsSectionProps {
  projects: SoftwareProject[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations("software.SoftwareProjectsSection");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  // Use a ref to store scroll progress of all cards without causing re-renders
  const scrollProgressRef = useRef<{ [key: number]: number }>({});
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const progressValues = scrollProgressRef.current;
          let closestId = null;
          let minDistance = Infinity;

          // Find the card closest to the viewport center (progress 0.5)
          for (const id in progressValues) {
            const distance = Math.abs(progressValues[id] - 0.5);
            if (distance < minDistance) {
              minDistance = distance;
              closestId = parseInt(id, 10);
            }
          }

          if (activeCardId !== closestId) {
            setActiveCardId(closestId);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCardId]);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projekte">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16">
        {projects.map((project, index) => (
          <AnimatedProjectCard
            key={project.id}
            project={project}
            index={index}
            isActive={project.id === activeCardId}
            onScrollProgressChange={(progress) => {
              // Each card reports its progress back to the parent's ref
              scrollProgressRef.current[project.id] = progress;
            }}
          />
        ))}
      </div>
    </section>
  );
}
