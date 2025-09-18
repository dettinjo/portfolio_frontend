import { notFound } from "next/navigation";
import { getTranslations, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Metadata } from "next";
import { WithContext, SoftwareApplication } from "schema-dts";

// ============================================================================
// --- MOCK DATA & API FUNCTIONS ---
// ============================================================================

const projectsData = [
  {
    id: 1,
    slug: "portfolio-website-v2",
    title: "Portfolio Website",
    description:
      "A dynamic portfolio site built with Next.js, Strapi CMS, and shadcn/ui for a fully customizable experience.",
    longDescription:
      "This project is the very website you are currently viewing. It was developed from the ground up using modern web technologies. The core of the application is Next.js 14 with the App Router, enabling server-side rendering for fast load times and SEO benefits. The user interface was created with shadcn/ui and Tailwind CSS to ensure a clean, responsive, and theme-aware design. All content, including projects and skills, is dynamically fetched from a Strapi Headless CMS, allowing for easy updates without code changes.",
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
    title: "E-Commerce Platform API",
    description:
      "A robust backend API supporting product management, user authentication, and order processing.",
    longDescription:
      "A powerful RESTful API that serves as the backbone for an e-commerce platform. Developed with Node.js and Express, it utilizes MongoDB for flexible data persistence. Authentication is secured with JSON Web Tokens (JWT). The API covers endpoints for product catalogs, user management, shopping carts, and orders.",
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
};

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

async function getProjectData(slug: string) {
  // In a real app, this would fetch from Strapi
  const project = projectsData.find((p) => p.slug === slug);
  return Promise.resolve(project);
}

// ============================================================================
// --- SEO METADATA GENERATION ---
// ============================================================================

type Props = {
  params: { slug: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectData(params.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.imageUrl,
          width: 1280,
          height: 720,
          alt: `Preview for ${project.title}`,
        },
      ],
      type: "article",
      locale: params.locale,
    },
    alternates: {
      canonical: `https://${softwareDomain}/${project.slug}`,
      languages: {
        en: `https://${softwareDomain}/${project.slug}`,
        de: `https://de.${softwareDomain}/${project.slug}`, // Example
        "x-default": `https://${softwareDomain}/${project.slug}`,
      },
    },
  };
}

// ============================================================================
// --- PAGE COMPONENT ---
// ============================================================================

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectData(params.slug);
  const t = await getTranslations("ProjectDetailsPage");
  const format = await getFormatter({ locale: params.locale });

  if (!project) {
    notFound();
  }

  const jsonLd: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: project.projectType,
    description: project.longDescription || project.description,
    operatingSystem: "WEB",
    author: {
      "@type": "Person",
      name: "Joel Dettinger",
    },
  };

  const hasLinks = project.liveUrl || project.repoUrl;
  const images = project.gallery?.length ? project.gallery : [project.imageUrl];
  let formattedDate = null;
  if (project.developedAt) {
    const date = new Date(`${project.developedAt}-01T12:00:00Z`);
    formattedDate = format.dateTime(date, { year: "numeric", month: "long" });
  }

  return (
    <article className="max-w-6xl mx-auto py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Button asChild variant="ghost" className="-ml-4 mb-8">
        <Link href="/#projekte">
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
                    {project.liveUrl ? (
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
                    ) : null}
                    {project.repoUrl ? (
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
                    ) : null}
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
