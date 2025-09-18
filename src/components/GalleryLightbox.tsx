"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface GalleryLightboxProps {
  images: string[];
  startIndex?: number;
  children: React.ReactNode;
  altPrefix: string;
}

export function GalleryLightbox({
  images,
  startIndex = 0,
  children,
  altPrefix,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isOpen, setIsOpen] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") goToNext();
        if (event.key === "ArrowLeft") goToPrevious();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, goToNext, goToPrevious]);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setCurrentIndex(startIndex);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        // --- THIS IS THE DEFINITIVE FIX ---
        // This prevents the dialog from automatically focusing the first button on open.
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="bg-black/80 backdrop-blur-sm border-none shadow-none w-screen h-screen max-w-full p-0 flex items-center justify-center"
      >
        <VisuallyHidden asChild>
          <DialogTitle>{`${altPrefix} - Image ${
            currentIndex + 1
          }`}</DialogTitle>
        </VisuallyHidden>

        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              stopPropagation(e);
              goToPrevious();
            }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 hover:text-white h-12 w-12 rounded-full"
            aria-label="Previous image"
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
        )}

        <div
          className="relative w-full h-full max-w-[90vw] max-h-[85vh]"
          onClick={stopPropagation}
        >
          <Image
            src={images[currentIndex]}
            alt={`${altPrefix} - Image ${currentIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              stopPropagation(e);
              goToNext();
            }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 hover:text-white h-12 w-12 rounded-full"
            aria-label="Next image"
          >
            <ArrowRight className="h-8 w-8" />
          </Button>
        )}

        {images.length > 1 && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black/50 text-white text-sm px-3 py-1 pointer-events-none"
            onClick={stopPropagation}
          >
            {currentIndex + 1} / {images.length}
          </div>
        )}

        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close lightbox"
            onClick={stopPropagation}
            className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-white hover:bg-white/20 hover:text-white h-12 w-12 rounded-full"
          >
            <X className="h-8 w-8" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
