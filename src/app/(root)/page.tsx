import { CardDefault } from "@/components/CardDefault";
import { Heading } from "@/components/Heading";
import { ImageLoading } from "@/components/ImageLoading";
import { PrataSection } from "@/components/pages/home/PrataSection";
import { getCategories } from "@/services/categoriesService";
import { getProducts } from "@/services/productService";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function HomePage() {
  const allProducts = use(getProducts({ size: "7", cat: "1" }));
  const allCategories = use(getCategories());

  return (
    <div className="w-full">
      <section className="grid h-[400px] grid-cols-3 grid-rows-3 gap-2 p-1">
        <div className="col-span-2 row-span-3 bg-zinc-100">descricao</div>
        <div className="col-start-3 row-span-3 grid grid-cols-2">
          <div className="col-span-2">baixo</div>
          <div>cima</div>
          <div className="h-[100px] border-2 border-zinc-100 p-3">
            <Image
              className="h-full w-full"
              width={200}
              height={200}
              alt=""
              src="/logo.svg"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center p-6 py-10">
        <Heading as="h2" className="text-center">
          Principais coleções
        </Heading>

        <div className="flex justify-center gap-6 py-4">
          {allCategories.data.slice(0, 2).map((cat, index) => (
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
              <h3 className="mt-2 text-center font-encode text-lg font-medium uppercase">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center bg-default/20 p-6 px-0 md:px-6">
        <Image
          className="w-auto border-2 border-zinc-200 object-cover shadow md:w-[400px]"
          alt="Folhado anúncio"
          src="/folhado2.png"
          width={800}
          height={800}
        />
      </section>

      <PrataSection products={allProducts.data} />
    </div>
  );
}
