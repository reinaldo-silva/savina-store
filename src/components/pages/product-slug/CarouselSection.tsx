"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

  return (
    <section className="relative -mb-8 flex max-h-[300px] min-h-[300px] w-full flex-1 border-b border-zinc-100 md:-mb-12">
      <Carousel
        opts={{
          loop: true,
        }}
        className="flex h-full w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {images.map((img, index) => (
            <ItemLoading
              key={index}
              url={img.image_url}
              alt={`${img}-${index}`}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export function ItemLoading({ alt, url }: { url: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CarouselItem className="min-h-[300px] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
      <div
        className={clsx("flex h-full flex-1 items-center justify-center", {
          "animate-pulse bg-zinc-300": isLoading,
        })}
      >
        <Image
          onLoad={() => {
            setIsLoading(false);
          }}
          priority
          width={1300}
          height={1300}
          src={url}
          alt={alt}
          className="h-full object-cover"
        />
      </div>
    </CarouselItem>
  );
}
