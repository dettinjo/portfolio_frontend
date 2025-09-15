// src/app/dev/[slug]/page.tsx

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

// Diese Funktion wird später die Daten für EINEN Slug von der API abrufen
async function getProjectData(slug: string) {
  // Mock-Daten für die Vorlage
  return {
    title: "Portfolio Webseite",
    longDescription:
      "Dies ist eine detaillierte Beschreibung des Projekts. Es wurde mit dem Ziel entwickelt, eine moderne und performante Plattform zu schaffen, um meine Fähigkeiten in der Software-Entwicklung und Fotografie zu präsentieren. Der Tech-Stack wurde sorgfältig ausgewählt, um Flexibilität und Skalierbarkeit zu gewährleisten.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Strapi",
      "shadcn/ui",
    ],
    liveUrl: "#", // Link zur Live-Seite
    repoUrl: "#", // Link zum GitHub-Repo
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectData(params.slug);

  return (
    <article className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Hauptinhalt */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {project.longDescription}
        </p>
        {/* Hier könnte später mehr Inhalt stehen, z.B. Bilder, Markdown etc. */}
      </div>

      {/* Sidebar mit Metadaten */}
      <aside className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Projekt-Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Technologien</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full">
                <a href={project.liveUrl} target="_blank">
                  Live-Vorschau <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <a href={project.repoUrl} target="_blank">
                  Code auf GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </article>
  );
}
