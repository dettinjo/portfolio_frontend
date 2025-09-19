"use client";

import Image from "next/image";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Button } from "@/components/ui/button";
import { ArrowUp, Images } from "lucide-react"; // 1. Import the 'Images' icon

interface Album {
  id: number;
  slug: string;
  title: string;
  coverImageUrl: string;
  images: string[];
}

interface PhotoGridSectionProps {
  albums: Album[];
}

export function PhotoGridSection({ albums }: PhotoGridSectionProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
        {albums.map((album, albumIndex) => (
          <GalleryLightbox
            key={album.id}
            allAlbums={albums}
            startAlbumIndex={albumIndex}
            startPhotoIndex={0}
          >
            <div className="group relative block aspect-[4/5] cursor-pointer overflow-hidden focus-visible:outline-none">
              <Image
                src={album.coverImageUrl}
                alt={`Cover image for ${album.title}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                // 2. The `group-hover:scale-110` class has been removed to disable the zoom.
                className="object-cover transition-transform duration-300"
                priority={albumIndex < 6}
              />
              {/* --- THIS IS THE DEFINITIVE FIX --- */}
              {/* 3. The overlay now uses flex-col to stack the title and the new photo count indicator. */}
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-center text-lg font-semibold text-white">
                  {album.title}
                </h3>
                {/* 4. This new element displays the icon and the number of images in the album. */}
                <div className="flex items-center gap-1.5 mt-2 text-sm text-white/80">
                  <Images className="h-4 w-4" />
                  <span>
                    {album.images.length}{" "}
                    {album.images.length > 1 ? "Photos" : "Photo"}
                  </span>
                </div>
              </div>
            </div>
          </GalleryLightbox>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="secondary" onClick={handleScrollToTop}>
          <ArrowUp className="mr-2 h-4 w-4" />
          Back to Top
        </Button>
      </div>
    </section>
  );
}
