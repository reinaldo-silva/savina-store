"use client";
import { ImageLoading } from "@/components/ImageLoading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useComponentWidth from "@/hook/useComponentWidth";
import { Image as IImage } from "@/services/productService";
import { ImageBroken } from "@phosphor-icons/react";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef, useState } from "react";

interface CarouselSectionProps {
  images: IImage[];
  isCatalog?: boolean;
  grayscale?: boolean;
}

export function CarouselSection({
  images,
  isCatalog,
  grayscale,
}: CarouselSectionProps) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [currentImageView, setCurrentImageView] = useState<null | IImage>(null);
  const { ref, width } = useComponentWidth();

  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex h-[400px] border-b border-zinc-100 sm:h-[400px]",
        { "sm:w-full md:w-[400px]": !images[0] },
      )}
    >
      {images[0] ? (
        <Carousel
          opts={{
            loop: true,
          }}
          className="flex h-full"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="size-full">
            {images.map((img, index) => (
              <CarouselItem
                key={index}
                className={clsx({
                  "basis-1/2": width > 600,
                  "!basis-1/2": images.length === 2 && width > 600,
                  "basis-1/3": width > 750,
                  "!basis-1/3": images.length === 3 && width > 930,
                  "basis-1/4": width > 930,
                })}
              >
                <button
                  className="size-full"
                  disabled={isCatalog}
                  onClick={() => {
                    setCurrentImageView(img);
                  }}
                >
                  <ImageLoading
                    grayscale={grayscale}
                    url={img.image_url}
                    alt={`${img.product_id}-${index}`}
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <Dialog
            open={!!currentImageView}
            onOpenChange={() => setCurrentImageView(null)}
          >
            {currentImageView && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Visualizador de imagem</DialogTitle>
                  <DialogDescription>
                    Veja a imagem no seu tamanho original
                  </DialogDescription>
                </DialogHeader>
                <Image
                  className="my-4 object-contain"
                  src={currentImageView.image_url}
                  width={1000}
                  height={1000}
                  alt="Image zoom"
                />
              </DialogContent>
            )}
          </Dialog>
        </Carousel>
      ) : (
        <div className="flex size-full items-center justify-center bg-zinc-200">
          <ImageBroken size={64} strokeWidth={2} className="text-zinc-300" />
        </div>
      )}
    </div>
  );
}
