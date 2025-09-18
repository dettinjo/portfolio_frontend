"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// Update the Project interface to include the new field
interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectType: string; // <-- Neues Feld
}

interface ProjectsSectionProps {
  projects: Project[];
}

const techIconMap: { [key: string]: string } = {
  "Next.js": "devicon-nextjs-plain",
  React: "devicon-react-original",
  Strapi: "devicon-strapi-plain",
  TypeScript: "devicon-typescript-plain",
  "Tailwind CSS": "devicon-tailwindcss-plain",
  "Node.js": "devicon-nodejs-plain",
  Express: "devicon-express-original",
  MongoDB: "devicon-mongodb-plain",
  JWT: "devicon-jsonwebtokens-original",
  Python: "devicon-python-plain",
  FastAPI: "devicon-fastapi-plain",
  PostgreSQL: "devicon-postgresql-plain",
  Docker: "devicon-docker-plain",
  "GitHub Actions": "devicon-githubactions-plain",
  Vercel: "devicon-vercel-original",
  "D3.js": "devicon-d3js-plain",
  TensorFlow: "devicon-tensorflow-original",
  "AI/ML": "devicon-google_ml_kit-original",
  "CI/CD": "devicon-git-plain", // Using a representative icon for CI/CD
  Datenvisualisierung: "devicon-grafana-original", // Using a representative icon
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations("SoftwareProjectsSection");

  return (
    <section id="projekte" className="space-y-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="space-y-24">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
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
                src={project.imageUrl}
                alt={`Preview image for ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-xl border-2 border-foreground"
              />
            </div>

            <div className="flex flex-col items-start">
              {/* --- HIER WIRD DER PROJEKTTYP ANGEZEIGT --- */}
              <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                {project.projectType}
              </p>
              <h3 className="text-3xl font-bold mt-2">{project.title}</h3>
              <p className="mt-4 text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => {
                  const iconClassName = techIconMap[tag];
                  return (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="gap-1.5 px-2 py-1" // Apply consistent padding and gap
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
                <Link href={`/software/${project.slug}`}>
                  {t("button_details")}
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
