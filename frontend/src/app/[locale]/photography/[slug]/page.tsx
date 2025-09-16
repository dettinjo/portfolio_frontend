// This file represents the detail page for a single photo album.

// This async function will eventually fetch data for ONE album from your Strapi API
// based on the slug provided in the URL.
async function getAlbumData(slug: string) {
  console.log(`Fetching data for album with slug: ${slug}`);

  // For now, we'll return mock data.
  return {
    title: `Album: ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
    // You can add more mock data here, like an array of image URLs
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1280&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517423568342-be24c2f0a8d4?q=80&w=1280&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=1280&auto=format&fit=crop",
    ],
  };
}

// --- THE FIX IS HERE ---
// The function signature is now syntactically correct.
export default async function AlbumDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const album = await getAlbumData(params.slug);

  return (
    <article className="container mx-auto py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">{album.title}</h1>

      {/* A simple masonry-style grid for the photos */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {album.images.map((imageUrl, index) => (
          // We use `next/image` but need to configure the hostname if it's not already done.
          // For now, we'll disable the linter warning.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={imageUrl}
            alt={`Photograph ${index + 1} from the album ${album.title}`}
            className="mb-4 rounded-xl w-full h-auto block border-2 border-foreground"
          />
        ))}
      </div>
    </article>
  );
}
