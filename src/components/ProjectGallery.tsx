"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectGalleryProps {
  images: string[];
  altPrefix: string;
}

export function ProjectGallery({ images, altPrefix }: ProjectGalleryProps) {
  const t = useTranslations("software.ProjectGallery");

  const galleryRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const albumForLightbox = [{ title: altPrefix, images: images }];

  const checkArrows = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const { scrollLeft, scrollWidth, clientWidth } = gallery;
    setShowLeftArrow(scrollLeft > 1);
    const isAtEnd = scrollWidth - scrollLeft - clientWidth < 1;
    setShowRightArrow(!isAtEnd && images.length > 1);
  }, [images.length]);

  useEffect(() => {
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
            <GalleryLightbox
              key={index}
              allAlbums={albumForLightbox}
              startAlbumIndex={0}
              startPhotoIndex={index}
            >
              {/* --- THIS IS THE FIX (Part 1): The outer box now has consistent padding --- */}
              <div className="group/image relative aspect-video w-full flex-shrink-0 snap-center cursor-pointer p-8">
                {/* --- THIS IS THE FIX (Part 2): A new inner div acts as the image's frame --- */}
                <div className="relative w-full h-full">
                  <Image
                    src={imgSrc}
                    alt={t("thumbnailAlt", {
                      index: index + 1,
                      prefix: altPrefix,
                    })}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 896px"
                    className="object-contain transition-transform duration-300 group-hover/image:scale-105"
                    priority={index === 0}
                  />
                </div>
                {/* This overlay correctly covers the entire padded, clickable area */}
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
        aria-label={t("scrollLeft")}
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
        aria-label={t("scrollRight")}
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
