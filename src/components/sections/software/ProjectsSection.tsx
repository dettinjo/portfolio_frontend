"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { SoftwareProject } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

interface ProjectsSectionProps {
  projects: SoftwareProject[];
  techIconMap: { [key: string]: string };
}

export function ProjectsSection({
  projects,
  techIconMap,
}: ProjectsSectionProps) {
  const t = useTranslations("software.SoftwareProjectsSection");

  if (!projects || projects.length === 0) {
    return (
      <section id="projekte" className="text-center py-12">
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          No projects are currently available.
        </p>
      </section>
    );
  }

  return (
    <section id="projekte" className="space-y-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="space-y-24">
        {projects.map((project, index) => {
          const {
            id,
            title,
            description,
            tags,
            coverImage,
            projectType,
            slug,
          } = project;

          const imageUrl =
            getStrapiMedia(coverImage?.url) || "/placeholder.jpg";

          return (
            <motion.div
              key={id}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className={`aspect-video relative ${
                  index % 2 === 1 ? "md:order-last" : ""
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`Preview image for ${title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-xl border-2 border-foreground"
                />
              </div>

              <div className="flex flex-col items-start">
                <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                  {projectType}
                </p>
                <h3 className="text-3xl font-bold mt-2">{title}</h3>
                <p className="mt-4 text-muted-foreground">{description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(tags || []).map((tag) => {
                    const iconClassName = techIconMap[tag];
                    return (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="gap-1.5 px-2 py-1"
                      >
                        {iconClassName && (
                          <i className={`${iconClassName} text-base`}></i>
                        )}
                        <span>{tag}</span>
                      </Badge>
                    );
                  })}
                </div>
                <Button asChild className="mt-8">
                  <Link href={`/${slug}`}>{t("button_details")}</Link>
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
