"use client"; // This component uses Framer Motion, so it must be a client component.

import { AnimatedGrid, AnimatedGridItem } from "@/components/AnimatedGrid";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation"; // Use the i18n Link for correct routing

// 1. We define the shape of a single album object for type safety.
interface Album {
  id: number;
  slug: string;
  title: string;
  description: string;
  coverImageUrl: string;
}

// 2. We define the props that this component accepts.
interface GalleriesSectionProps {
  albums: Album[];
}

// 3. We apply the props type to the function signature.
export function GalleriesSection({ albums }: GalleriesSectionProps) {
  return (
    <section id="galerien">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold">Galerien</h2>
        <p className="mt-2 text-muted-foreground">
          Entdecken Sie eine Auswahl meiner Arbeiten.
        </p>
      </div>
      <AnimatedGrid>
        {/* The rest of the component was already correct. It now knows what `albums` is. */}
        {albums.map((album) => (
          <AnimatedGridItem key={album.id}>
            <Link
              href={`/photography/${album.slug}`}
              className="block group h-full"
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0">
                  <AspectRatio ratio={4 / 3}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={album.coverImageUrl}
                      alt={album.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                </CardContent>
                <CardHeader>
                  <CardTitle>{album.title}</CardTitle>
                  <CardDescription>{album.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </AnimatedGridItem>
        ))}
      </AnimatedGrid>
    </section>
  );
}
