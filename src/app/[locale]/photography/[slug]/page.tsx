import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import {
  fetchAlbumBySlug,
  fetchAllAlbumSlugs,
  getStrapiMedia,
} from "@/lib/strapi";
import { getTranslations } from "next-intl/server";
import { WithContext, ImageGallery, BreadcrumbList } from "schema-dts";

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
  const { slug, locale } = await params;
  const album = await fetchAlbumBySlug(slug, locale);
  if (!album) {
    return { title: "Album Not Found" };
  }

  const t = await getTranslations({
    locale: locale,
    namespace: "photography.AlbumPageSEO",
  });

  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Photographer";
  const firstName = fullName.split(" ")[0];
  const photographyDomain = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN;

  const { title, coverImage, localizations } = album;
  const coverImageUrl = getStrapiMedia(coverImage?.url);
  const description = t("description", { title: title, name: firstName });

  const languages: Record<string, string> = {};
  if (photographyDomain) {
    languages[locale] = `https://${
      locale === "de" ? "de." : ""
    }${photographyDomain}/${slug}`;
    localizations?.forEach((loc) => {
      languages[loc.locale] = `https://${
        loc.locale === "de" ? "de." : ""
      }${photographyDomain}/${loc.slug}`;
    });
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: coverImageUrl
        ? [{ url: coverImageUrl, alt: `Cover image for the album ${title}` }]
        : [],
    },
    alternates: {
      canonical: photographyDomain
        ? `https://${locale === "de" ? "de." : ""}${photographyDomain}/${slug}`
        : undefined,
      languages: languages,
    },
  };
}

// The main page component
export default async function AlbumDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const album = await fetchAlbumBySlug(slug, locale);

  if (!album) {
    notFound();
  }

  const { title, images } = album;

  // FIX: Define photographyDomain within the component scope
  const photographyDomain = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN;

  const imageGalleryJsonLd: WithContext<ImageGallery> = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: title,
    image: images?.map((image) => ({
      "@type": "ImageObject",
      contentUrl: `${STRAPI_URL}${image.url}`,
      name: image.alternativeText || `Photograph from the album ${title}`,
    })),
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://${photographyDomain}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
      },
    ],
  };

  return (
    <article className="container mx-auto py-16 px-4 md:py-24">
      {/* ADDED: Script tags for JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
