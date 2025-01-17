import { CardDefault } from "@/components/CardDefault";
import { ClientOnly } from "@/components/ClientOnly";
import { Heading } from "@/components/Heading";
import { ImageLoading } from "@/components/ImageLoading";
import { PrataSection } from "@/components/pages/home/PrataSection";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/categoriesService";
import { getProducts } from "@/services/productService";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function HomePage() {
  const allProducts = use(getProducts({ size: "7", cat: "1" }));
  const allCategories = use(getCategories());

  return (
    <div className="w-full">
      <ClientOnly fallback={<div className="h-[460px] w-full bg-zinc-300" />}>
        <section className="relative h-[220px] sm:h-[300px] md:h-[460px]">
          <Image
            className="h-full w-full object-cover object-left-bottom"
            width={1280}
            height={500}
            alt=""
            src="/fullbanner.png"
          />
          <Link
            className="absolute bottom-7 left-6 sm:bottom-10 sm:left-10 md:bottom-14 md:left-14"
            href="/search"
          >
            <Button className="uppercase">
              Conferir <ChevronRight />
            </Button>
          </Link>
        </section>
      </ClientOnly>
      <section className="flex flex-col justify-center p-6 py-10">
        <Heading as="h2" className="text-center">
          Principais coleções
        </Heading>

        <div className="flex justify-center gap-6 py-4">
          {(allCategories.data ?? []).slice(0, 2).map((cat, index) => (
            <div key={index}>
              <CardDefault className="size-[160px] overflow-hidden !p-0 md:size-[200px]">
                <Link
                  href={`/search?cat=${cat.id}`}
                  className="group h-full w-full"
                >
                  <ImageLoading
                    url={cat.id === 1 ? "/prata.jpg" : "/folhado.jpg"}
                    alt="img"
                    classNameImage="transition group-hover:scale-125"
                  />
                </Link>
              </CardDefault>
              <Text className="mt-2 text-center font-medium uppercase">
                {cat.name}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center bg-orange-400/80 p-6 px-0 md:px-6">
        <Image
          className="w-auto border-2 border-zinc-200 object-cover shadow md:w-[500px]"
          alt="Folhado anúncio"
          src="/folhado2.png"
          width={800}
          height={800}
        />
      </section>

      <PrataSection products={allProducts.data ?? []} />
    </div>
  );
}
