import { notFound } from "next/navigation";
import { albumsData } from "@/lib/mock-data";
import Image from "next/image"; // 1. Import the Next.js Image component

async function getAlbumData(slug: string) {
  const album = albumsData.find((album) => album.slug === slug);
  return Promise.resolve(album);
}

export default async function AlbumDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const album = await getAlbumData(params.slug);

  if (!album) {
    notFound();
  }

  return (
    <article className="container mx-auto py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">{album.title}</h1>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {album.images.map((imageUrl, index) => (
          // --- THIS IS THE DEFINITIVE FIX ---
          // 2. Replace `<img>` with `<Image />`.
          // We provide width and height for proper layout calculation, but `w-full h-auto`
          // in the className ensures it remains responsive.
          <Image
            key={index}
            src={imageUrl}
            alt={`Photograph ${index + 1} from the album ${album.title}`}
            width={800} // A base width for optimization
            height={1000} // A base height for optimization
            className="mb-4 rounded-xl w-full h-auto block border-2 border-foreground"
            sizes="(max-width: 768px) 50vw, 33vw" // Helps Next.js serve the right image size
          />
        ))}
      </div>
    </article>
  );
}
