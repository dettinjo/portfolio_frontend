// portfolio-frontend/src/app/[locale]/photography/page.tsx

import { getTranslations } from "next-intl/server";
import { PhotographyTabs } from "@/components/sections/photography/PhotographyTabs";
import { ProfileHeaderSection } from "@/components/sections/photography/ProfileHeaderSection";
import { fetchAlbums, fetchTestimonials } from "@/lib/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

const profileData = {
  name: "Joel Dettinger",
  avatarSrc: "/images/profile.png",
};

// --- THIS IS THE DEFINITIVE FIX (Part 1): Define the correct Props type ---
type Props = {
  params: Promise<{ locale: string }>;
};

// --- THIS IS THE DEFINITIVE FIX (Part 2): Await the params Promise ---
export default async function PhotographyPage({ params }: Props) {
  // Await the promise to safely get the locale value
  const { locale } = await params;

  const t = await getTranslations("photography.PhotographyPage");
  const rawAlbums = await fetchAlbums(locale);
  const rawTestimonials = await fetchTestimonials(locale);

  const albums = rawAlbums
    .filter((album) => album && album.slug)
    .map((album) => ({
      id: album.id,
      slug: album.slug,
      title: album.title,
      coverImageUrl: album.coverImage?.url
        ? `${STRAPI_URL}${album.coverImage.url}`
        : "/placeholder.jpg",
      images: (album.images || []).map((img) => `${STRAPI_URL}${img.url}`),
    }));

  const testimonials = rawTestimonials
    .filter((testimonial) => testimonial && testimonial.name)
    .map((testimonial) => ({
      name: testimonial.name,
      quote: testimonial.quote,
      role: testimonial.role,
      avatar: testimonial.avatar?.url
        ? `${STRAPI_URL}${testimonial.avatar.url}`
        : null,
      ratings: {
        communication: testimonial.communication || 0,
        creativity: testimonial.creativity || 0,
        professionalism: testimonial.professionalism || 0,
        value: testimonial.value || 0,
      },
    }));

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:py-24">
      <ProfileHeaderSection
        name={profileData.name}
        bio={t("profileBio")}
        avatarSrc={profileData.avatarSrc}
      />

      <PhotographyTabs
        albums={albums}
        testimonials={testimonials}
        translations={{
          feed: t("tabs.feed"),
          services: t("tabs.services"),
          testimonials: t("tabs.testimonials"),
          contact: t("tabs.contact"),
        }}
      />
    </div>
  );
}
