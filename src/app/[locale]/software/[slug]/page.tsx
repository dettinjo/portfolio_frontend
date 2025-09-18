import { notFound } from "next/navigation";
import { getTranslations, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { ProjectGallery } from "@/components/ProjectGallery";

// --- MOCK DATA REMAINS THE SAME ---
const projectsData = [
  {
    id: 1,
    slug: "portfolio-website-v2",
    title: "Portfolio Webseite",
    description:
      "Eine dynamische Portfolio-Seite, gebaut mit Next.js, Strapi CMS und shadcn/ui für ein voll anpassbares Erlebnis.",
    longDescription:
      "Dieses Projekt ist die Webseite, die Sie gerade betrachten. Sie wurde von Grund auf mit den modernsten Web-Technologien entwickelt. Der Kern der Anwendung ist Next.js 14 mit dem App Router, was serverseitiges Rendering für schnelle Ladezeiten und SEO-Vorteile ermöglicht. Die Benutzeroberfläche wurde mit shadcn/ui und Tailwind CSS erstellt, um ein sauberes, responsives und themen-fähiges Design zu gewährleisten. Alle Inhalte, einschließlich Projekte und Skills, werden dynamisch von einem Strapi Headless CMS bezogen, was eine einfache Aktualisierung ohne Code-Änderungen ermöglicht.",
    tags: ["Next.js", "React", "Strapi", "TypeScript", "Tailwind CSS"],
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1280&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1280&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1280&auto=format&fit=crop",
    ],
    projectType: "Full-Stack Web App",
    liveUrl: "https://joeldettinger.de",
    repoUrl: "https://github.com/dettinjo/my-portfolio",
    developedAt: "2024-05",
  },
  {
    id: 2,
    slug: "e-commerce-platform-api",
    title: "E-Commerce Plattform API",
    description:
      "Eine robuste Backend-API, die Produktmanagement, Benutzerauthentifizierung und Bestellabwicklung unterstützt.",
    longDescription:
      "Eine leistungsstarke RESTful-API, die als Rückgrat für eine E-Commerce-Plattform dient. Sie wurde mit Node.js und Express entwickelt und nutzt MongoDB für eine flexible Datenpersistenz. Die Authentifizierung wird durch JSON Web Tokens (JWT) sichergestellt. Die API deckt Endpunkte für Produktkataloge, Benutzerverwaltung, Warenkörbe und Bestellungen ab.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    imageUrl:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1280&auto=format&fit=crop",
    gallery: [],
    projectType: "Backend & API",
    liveUrl: null,
    repoUrl: "https://github.com/dettinjo/ecommerce-api",
    developedAt: "2023-11",
  },
];

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
};

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

async function getProjectData(slug: string) {
  const project = projectsData.find((p) => p.slug === slug);
  return project;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const project = await getProjectData(params.slug);
  const t = await getTranslations("ProjectDetailsPage");

  // --- THIS IS THE FIX ---
  // We must `await` the result of getFormatter
  const format = await getFormatter({ locale: params.locale });
  // -----------------------

  if (!project) {
    notFound();
  }

  const hasLinks = project.liveUrl || project.repoUrl;
  const images = project.gallery?.length ? project.gallery : [project.imageUrl];

  let formattedDate = null;
  if (project.developedAt) {
    const date = new Date(`${project.developedAt}-01T12:00:00Z`);
    // Now the 'format' variable correctly holds the formatter function
    formattedDate = format.dateTime(date, {
      year: "numeric",
      month: "long",
    });
  }

  return (
    <article className="max-w-6xl mx-auto py-12 px-6">
      <Button asChild variant="ghost" className="-ml-4 mb-8">
        <Link href="/software#projekte">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back_button")}
        </Link>
      </Button>

      <header>
        <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
          {project.projectType}
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>
      </header>

      <div className="mt-8">
        <ProjectGallery images={images} altPrefix={project.title} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold border-b-2 border-foreground pb-2">
            {t("about_title")}
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none mt-4 text-muted-foreground space-y-4">
            <p>{project.longDescription || project.description}</p>
          </div>
        </div>

        <aside className="space-y-8">
          <Card className="p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-lg">{t("details_title")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-6 space-y-6">
              {formattedDate && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    {t("developed_in_label")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formattedDate}
                  </p>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-sm mb-2">
                  {t("tech_title")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => {
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
              </div>
              {hasLinks && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    {t("links_title")}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {project.liveUrl && (
                      <Button asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("live_demo_button")}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button asChild>
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {t("source_code_button")}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>
  );
}
