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
}

const AnimatedLink = motion(Link);

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations("software.SoftwareProjectsSection");

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
        {projects.map((project, index) => {
          const { id, title, description, coverImage, projectType, slug } =
            project;

          const imageUrl =
            getStrapiMedia(coverImage?.url) || "/placeholder.jpg";

          return (
            <AnimatedLink
              key={id}
              href={`/${slug}`}
              className="flex flex-col md:flex-row min-h-[410px] group rounded-xl overflow-hidden transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background hover:bg-foreground"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* --- THIS IS THE FIX --- */}
              <div
                className={cn(
                  // 1. Add a fixed height on mobile screens (e.g., h-64 which is 256px)
                  "h-64",
                  // 2. Reset the height on medium screens so flexbox can take over
                  "md:h-auto md:w-1/2",
                  // 3. Slightly reduce padding on mobile for more image space
                  "p-8 md:p-16",
                  // The existing order logic remains unchanged
                  index % 2 === 1 ? "md:order-last" : ""
                )}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={`Preview for ${title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Box 2: The Text Container (This layout is correct) */}
              <div className="flex flex-col md:w-1/2 p-10 md:p-16 group-hover:text-background">
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase group-hover:text-background">
                    {projectType}
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-foreground group-hover:text-background">
                    {title}
                  </h3>
                  <p className="mt-4 text-muted-foreground line-clamp-3 group-hover:text-background">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-background">
                  <span>{t("button_details")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </AnimatedLink>
          );
        })}
      </div>
    </section>
  );
}
