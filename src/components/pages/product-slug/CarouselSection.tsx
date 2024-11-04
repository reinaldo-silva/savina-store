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
import { Image as IImage } from "@/services/productService";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef, useState } from "react";

interface CarouselSectionProps {
  images: IImage[];
}

export function CarouselSection({ images }: CarouselSectionProps) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [currentImageView, setCurrentImageView] = useState<null | IImage>(null);

  return (
    <section className="relative -mb-8 flex max-h-[300px] min-h-[300px] w-full flex-1 border-b border-zinc-100 md:-mb-12">
      <Carousel
        opts={{
          loop: true,
        }}
        className="flex h-full w-full justify-center"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className={clsx(
                "min-h-[300px] sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
                { "sm:!basis-1/3": images.length === 3 },
                { "sm:!basis-1/2": images.length === 2 },
              )}
            >
              <button
                onClick={() => {
                  setCurrentImageView(img);
                }}
              >
                <ImageLoading url={img.image_url} alt={`${img}-${index}`} />
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
    </section>
  );
}
