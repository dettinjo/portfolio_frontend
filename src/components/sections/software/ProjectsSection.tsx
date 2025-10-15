"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { SoftwareProject } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  projects: SoftwareProject[];
  // --- THIS IS THE DEFINITIVE FIX (PART 2) ---
  // The longestDescription prop is removed from the interface.
}

const AnimatedLink = motion(Link);

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations("software.SoftwareProjectsSection");

  if (!projects || projects.length === 0) {
    // ...
  }

  return (
    <section id="projekte">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="space-y-16">
        {projects.map((project, index) => {
          const { id, title, description, coverImage, projectType, slug } =
            project;

          const imageUrl =
            getStrapiMedia(coverImage?.url) || "/placeholder.jpg";

          const isSvg = imageUrl.endsWith(".svg");

          return (
            <AnimatedLink
              key={id}
              href={`/${slug}`}
              className="block group rounded-xl overflow-hidden transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background hover:bg-foreground"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* items-stretch is the default for grid, keeping equal height columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                {/* --- THIS IS THE DEFINITIVE FIX (PART 3) --- */}
                {/* Image container reverts to the last known working layout, removing the complex nested solution. */}
                <div
                  className={cn(
                    "relative flex items-center justify-center",
                    index % 2 === 1 ? "md:order-last" : ""
                  )}
                >
                  <Image
                    src={imageUrl}
                    alt={`Preview image for ${title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={cn(
                      isSvg ? "object-contain p-8 md:p-12" : "object-cover"
                    )}
                  />
                </div>

                <div className="flex flex-col justify-center items-start p-8 md:p-12 group-hover:text-background">
                  <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase group-hover:text-background">
                    {projectType}
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-foreground group-hover:text-background">
                    {title}
                  </h3>
                  {/* --- THIS IS THE DEFINITIVE FIX (PART 4) --- */}
                  {/* Restore line-clamp-3 for clean visual flow, accepting natural height differences. */}
                  <p className="mt-4 text-muted-foreground line-clamp-3 group-hover:text-background">
                    {description}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-background">
                    <span>{t("button_details")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </AnimatedLink>
          );
        })}
      </div>
    </section>
  );
}
