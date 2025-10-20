// src/components/ImageCropperDialog.tsx
"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";
import { useTranslations } from "next-intl";

interface ImageCropperDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  imageSrc: string | null;
  onCropComplete: (croppedFile: File) => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export function ImageCropperDialog({
  isOpen,
  onOpenChange,
  imageSrc,
  onCropComplete,
}: ImageCropperDialogProps) {
  const t = useTranslations("photography.LeaveReviewPage.cropper");
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  async function handleCropImage() {
    const image = imgRef.current;
    if (!image || !completedCrop) {
      throw new Error("Crop details or image element not available.");
    }

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(completedCrop.width * scaleX);
    canvas.height = Math.floor(completedCrop.height * scaleY);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }

        try {
          // FIX 1: Convert the canvas blob to a File before compressing.
          const fileToCompress = new File([blob], "source_image.jpg", {
            type: blob.type,
          });

          const compressionOptions = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          };

          // Pass the new File object to the compression library.
          const compressedBlob = await imageCompression(
            fileToCompress,
            compressionOptions
          );

          const croppedFile = new File([compressedBlob], "avatar.jpg", {
            type: compressedBlob.type,
          });

          onCropComplete(croppedFile);
          onOpenChange(false);
        } catch (error) {
          console.error("Image compression error:", error);
        }
      },
      "image/jpeg",
      0.95
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              minWidth={100}
            >
              {/* FIX 2: Disable the Next.js image warning for this specific line. */}
              {/* This is necessary because react-image-crop requires a standard <img> tag. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                onLoad={onImageLoad}
                style={{ maxHeight: "70vh" }}
              />
            </ReactCrop>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("buttonCancel")}
          </Button>
          <Button onClick={handleCropImage}>{t("buttonCrop")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
