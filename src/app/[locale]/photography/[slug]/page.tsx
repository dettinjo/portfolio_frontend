import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { fetchAlbumBySlug, fetchAllAlbumSlugs } from "@/lib/strapi";
import { getTranslations } from "next-intl/server";

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
  const album = await fetchAlbumBySlug(params.slug, params.locale);
  if (!album) {
    return { title: "Album Not Found" };
  }

  const t = await getTranslations({
    locale: params.locale,
    namespace: "photography.AlbumPageSEO",
  });

  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Photographer";
  const firstName = fullName.split(" ")[0];

  const { title, coverImage } = album;
  const coverImageUrl = coverImage?.url;
  const description = t("description", { title: title, name: firstName });

  return {
    title: title, // The album's specific title
    description: description, // The new dynamic description
    openGraph: {
      title: title,
      description: description,
      images: coverImageUrl
        ? [
            {
              url: `${STRAPI_URL}${coverImageUrl}`,
              alt: `Cover image for the album ${title}`,
            },
          ]
        : [],
    },
  };
}

// The main page component
export default async function AlbumDetailPage({ params }: Props) {
  const album = await fetchAlbumBySlug(params.slug, params.locale);

  if (!album) {
    notFound();
  }

  const { title, images } = album;

  return (
    <article className="container mx-auto py-16 px-4 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center">{title}</h1>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
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
