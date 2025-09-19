"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  altPrefix: string;
}

export function ProjectGallery({ images, altPrefix }: ProjectGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // --- THIS IS THE DEFINITIVE FIX (PART 1) ---
  // Create a single "album" object on the fly to match the data structure
  // that the updated GalleryLightbox component now expects.
  const albumForLightbox = [
    {
      title: altPrefix,
      images: images,
    },
  ];

  const checkArrows = useCallback(() => {
    // ... (this function remains the same)
    const gallery = galleryRef.current;
    if (!gallery) return;
    const { scrollLeft, scrollWidth, clientWidth } = gallery;
    setShowLeftArrow(scrollLeft > 1);
    const isAtEnd = scrollWidth - scrollLeft - clientWidth < 1;
    setShowRightArrow(!isAtEnd && images.length > 1);
  }, [images.length]);

  useEffect(() => {
    // ... (this hook remains the same)
    const gallery = galleryRef.current;
    if (gallery) {
      checkArrows();
      gallery.addEventListener("scroll", checkArrows, { passive: true });
      window.addEventListener("resize", checkArrows);
      return () => {
        gallery.removeEventListener("scroll", checkArrows);
        window.removeEventListener("resize", checkArrows);
      };
    }
  }, [checkArrows]);

  const scrollRight = () => {
    galleryRef.current?.scrollBy({
      left: galleryRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    galleryRef.current?.scrollBy({
      left: -galleryRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group">
      <div className="overflow-hidden border-2 border-foreground rounded-lg shadow-md">
        <div
          ref={galleryRef}
          className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent gap-0"
        >
          {images.map((imgSrc, index) => (
            // --- THIS IS THE DEFINITIVE FIX (PART 2) ---
            // Pass the data using the new prop names:
            // - `allAlbums` instead of `images`
            // - `startAlbumIndex` (which is always 0 here)
            // - `startPhotoIndex` instead of `startIndex`
            <GalleryLightbox
              key={index}
              allAlbums={albumForLightbox}
              startAlbumIndex={0}
              startPhotoIndex={index}
            >
              <div className="group/image relative aspect-video w-full flex-shrink-0 snap-center cursor-pointer">
                <Image
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1} for ${altPrefix}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 896px"
                  className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="h-10 w-10 text-white" />
                </div>
              </div>
            </GalleryLightbox>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={scrollLeft}
        aria-label="Scroll left"
        className={`absolute top-1/2 -translate-y-1/2 left-4 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm transition-opacity hover:bg-background/90
                    ${
                      showLeftArrow
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={scrollRight}
        aria-label="Scroll right"
        className={`absolute top-1/2 -translate-y-1/2 right-4 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm transition-opacity hover:bg-background/90
                    ${
                      showRightArrow
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
      >
        <ArrowRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
