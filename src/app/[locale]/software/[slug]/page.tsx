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
import { fetchSoftwareProjectBySlug, fetchAllProjectSlugs } from "@/lib/strapi";
import {
  BlocksRenderer,
  // --- THIS IS THE FIX: The unused type has been removed ---
} from "@strapi/blocks-react-renderer";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

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

export async function generateStaticParams() {
  const projects = await fetchAllProjectSlugs();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

type Props = {
  params: { slug: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await fetchSoftwareProjectBySlug(params.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const { title, description, coverImage } = project;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: `${STRAPI_URL}${coverImage?.url}`,
          width: 1280,
          height: 720,
          alt: `Preview for ${title}`,
        },
      ],
      type: "article",
      locale: params.locale,
    },
  };
}

// The main page component
export default async function ProjectDetailPage({ params }: Props) {
  const project = await fetchSoftwareProjectBySlug(params.slug);
  const t = await getTranslations("software.ProjectDetailsPage");
  const format = await getFormatter({ locale: params.locale });

  if (!project) {
    notFound();
  }

  const {
    title,
    description,
    longDescription,
    projectType,
    developedAt,
    liveUrl,
    repoUrl,
    tags,
    coverImage,
    gallery,
  } = project;

  const jsonLd: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    applicationCategory: projectType,
    description: description,
    author: {
      "@type": "Person",
      name: "Joel Dettinger",
    },
  };

  const hasLinks = liveUrl || repoUrl;

  const galleryImages =
    gallery && gallery.length > 0
      ? gallery.map((img) => `${STRAPI_URL}${img.url}`)
      : coverImage
      ? [`${STRAPI_URL}${coverImage.url}`]
      : [];

  let formattedDate = null;
  if (developedAt) {
    const date = new Date(developedAt);
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
          {projectType}
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>
      </header>

      <div className="mt-8">
        <ProjectGallery images={galleryImages} altPrefix={title} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold border-b-2 border-foreground pb-2">
            {t("about_title")}
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none mt-4 text-muted-foreground space-y-4">
            {longDescription ? (
              <BlocksRenderer content={longDescription} />
            ) : (
              <p>{description}</p>
            )}
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
              </div>
              {hasLinks && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    {t("links_title")}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {liveUrl && (
                      <Button asChild>
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("live_demo_button")}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {repoUrl && (
                      <Button asChild>
                        <a
                          href={repoUrl}
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
