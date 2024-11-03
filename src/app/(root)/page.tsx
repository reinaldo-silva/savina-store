import { Heading } from "@/components/Heading";
import { PrataSection } from "@/components/pages/home/PrataSection";
import { Text } from "@/components/Text";
import { getCategories } from "@/services/categoriesService";
import { getProducts } from "@/services/productService";
import { Instagram, Mail, Youtube } from "lucide-react";
import Image from "next/image";
import { use } from "react";

export default function HomePage() {
  const allProducts = use(getProducts({}));
  const allCategories = use(getCategories());

  return (
    <div>
      <section className="flex gap-2">
        <Image alt="banner" src="/img1.png" width={1200} height={1000} />
      </section>
      <section className="flex flex-col justify-center p-6 py-10">
        <Heading as="h2" className="text-balance text-center uppercase">
          Principais coleções
        </Heading>

        <div className="flex justify-center gap-6 py-4">
          {allCategories.data.slice(0, 3).map((cat, index) => (
            <div key={index}>
              <Image
                src="/img4.png"
                width={600}
                height={600}
                alt="img"
                className="h-[300px] w-[200px] object-cover"
              />
              <h3 className="mt-2 text-center font-encode text-lg font-medium uppercase">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="relative flex gap-12 bg-primary/40 p-12 pb-24">
        <div className="flex-1">
          <Heading as="h2" className="text-balance uppercase">
            Um pouco sobra a SAVINA
          </Heading>
          <Text className="mt-4 text-balance leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, earum
            sunt nobis deserunt aliquid ea. Corrupti a minima adipisci vel,
            doloribus exercitationem culpa quod deleniti, sunt quibusdam quaerat
            ab officiis modi tempora, totam saepe illo at ipsa deserunt vero
            perferendis! Neque reprehenderit illum molestiae vitae earum tenetur
            tempore nulla nostrum. Amet voluptatibus neque similique placeat
            quis, expedita harum quas quibusdam a minima numquam dolores quae
            temporibus unde ratione nisi pariatur ipsum consequuntur. Facere
            nostrum, recusandae similique suscipit sint saepe error obcaecati
            vitae odio corporis voluptas magni dolores omnis, eveniet ipsam!
            Enim nemo quam deserunt amet iure velit obcaecati animi
            reprehenderit.
          </Text>
        </div>

        <div className="absolute top-96">
          <Heading className="bg-zinc-900 p-4 !text-5xl uppercase italic !text-zinc-100">
            Todas peças escolhidas com amor
          </Heading>
        </div>

        <div className="w-[400px]">
          <Image
            src="/img5.png"
            width={600}
            height={600}
            alt="img"
            className="h-[500px] w-full object-cover"
          />
        </div>
      </section>

      <PrataSection products={allProducts.data} />

      <footer className="">
        <div className="mx-auto flex flex-col items-center gap-4 border-2 border-t border-zinc-50 bg-zinc-100 p-4">
          <Heading as="h3" className="text-balance uppercase">
            Nossos contatos
          </Heading>

          <div className="flex gap-2">
            <div className="cursor-pointer border-2 border-zinc-900 bg-zinc-50 p-2 hover:bg-zinc-900 hover:text-zinc-50">
              <Instagram />
            </div>
            <div className="cursor-pointer border-2 border-zinc-900 bg-zinc-50 p-2 hover:bg-zinc-900 hover:text-zinc-50">
              <Mail />
            </div>
            <div className="cursor-pointer border-2 border-zinc-900 bg-zinc-50 p-2 hover:bg-zinc-900 hover:text-zinc-50">
              <Youtube />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
