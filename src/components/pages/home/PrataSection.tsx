"use client";

import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
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
    <section className="p-4">
      <h2>Prata</h2>
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
          {products.map((prd, index) => (
            <ProductCard key={index} data={prd} />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
