"use client";

import { Heading } from "@/components/Heading";
import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/services/productService";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface PrataSectionProps {
  products: Product[];
}

export function PrataSection({ products }: PrataSectionProps) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="flex w-full max-w-screen-lg flex-col items-center p-4 py-10">
      <Heading as="h2">Prata 925</Heading>
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full max-w-screen-lg py-4"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {products.map((prd, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard data={prd} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
