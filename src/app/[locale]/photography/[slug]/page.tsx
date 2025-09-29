import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { fetchAlbumBySlug, fetchAllAlbumSlugs } from "@/lib/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

type Props = {
  params: { slug: string; locale: string };
};

// Generate static pages at build time
export async function generateStaticParams() {
  const albums = await fetchAllAlbumSlugs();
  return albums.map((album) => ({
    slug: album.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await fetchAlbumBySlug(params.slug);

  if (!album) {
    return { title: "Album Not Found" };
  }

  // --- THIS IS THE FIX (Part 1) ---
  // Destructure properties directly from the flat 'album' object
  const { title, coverImage } = album;
  const coverImageUrl = coverImage?.url;

  return {
    title: `${title} | Photography`,
    description: `A photography album titled "${title}".`,
    openGraph: {
      title: title,
      description: `A photography album titled "${title}".`,
      images: [
        {
          url: `${STRAPI_URL}${coverImageUrl}`,
          alt: `Cover image for the album ${title}`,
        },
      ],
    },
  };
}

// The main page component
export default async function AlbumDetailPage({ params }: Props) {
  const album = await fetchAlbumBySlug(params.slug);

  if (!album) {
    notFound();
  }

  // --- THIS IS THE FIX (Part 2) ---
  // Destructure properties directly from the flat 'album' object
  const { title, images } = album;

  return (
    <article className="container mx-auto py-16 px-4 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center">{title}</h1>

      {/* Masonry Grid for Photos */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {/* Ensure 'images' is not null before mapping */}
        {images?.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <Image
              src={`${STRAPI_URL}${image.url}`}
              alt={
                image.alternativeText || `Photograph from the album ${title}`
              }
              width={image.width}
              height={image.height}
              className="rounded-xl w-full h-auto block border-2 border-foreground"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </article>
  );
}
