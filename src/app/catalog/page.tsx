import { ClientOnly } from "@/components/ClientOnly";
import { Heading } from "@/components/Heading";
import { ListCatalog } from "@/components/pages/catalog/ListCatalog";
import { PreviewProduct } from "@/components/pages/catalog/PreviewProduct";
import { ProductCard } from "@/components/ProductCard";
import { Text } from "@/components/Text";
import { getProducts } from "@/services/productService";
import { CaretDown, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function CatalogPage() {
  const defaultFilter = {
    cat: "",
    name: "",
    size: "100",
  };

  const allProducts = use(getProducts(defaultFilter));

  if (allProducts.statusCode !== 200) {
    return null;
  }

  return (
    <div className="flex h-svh flex-col items-center justify-center overflow-hidden bg-orange-50/50">
      <div className="w-full max-w-screen-md flex-1 overflow-x-hidden overflow-y-scroll scroll-smooth border-x bg-zinc-50 pb-4">
        <header className="flex w-full flex-col items-center justify-between bg-zinc-50">
          <div className="flex h-56 w-full flex-col items-center justify-center p-2 py-4">
            <Image
              className="h-full object-contain"
              src="/logo-desc.svg"
              alt="Logo"
              width={400}
              height={400}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center bg-zinc-700 p-2 py-4">
            <div className="flex items-center space-x-2">
              <Text className="font-semibold text-zinc-200">
                Somentes pedidos via WhatsApp
              </Text>
              <WhatsappLogo
                weight="regular"
                className="text-zinc-200"
                size={20}
              />
            </div>
            <Text className="text-sm text-zinc-200">
              Hoário de atendimento das 8:00 as 17:00
            </Text>
          </div>
        </header>

        <section className="flex h-[calc(100svh-350px)] flex-col gap-2 border-b bg-zinc-100 p-4">
          <Heading as="h3">Savina Acessórios</Heading>
          <Text className="flex-1 text-muted-foreground">
            Na Savina Acessórios, oferecemos uma linda seleção de joias em prata
            925 e folheados, incluindo brincos, anéis, pulseiras e colares.
            Nossas peças são escolhidas com cuidado, garantindo qualidade e
            sofisticação. Encontre o acessório perfeito para brilhar em qualquer
            ocasião!
          </Text>

          <div className="flex flex-col items-center space-y-2 self-center">
            <Link
              href="#catalog"
              className="p flex w-32 flex-col items-center justify-center gap-3 rounded-full border border-zinc-300 p-2"
            >
              <Text className="text-sm font-semibold">Role para baixo</Text>
            </Link>
            <CaretDown
              className="animate-bounce text-zinc-600 duration-1000"
              size={24}
            />
          </div>
        </section>

        <Heading as="h3" className="px-4 pb-4 pt-8" id="catalog">
          Nosso catálogo
        </Heading>
        <ListCatalog>
          {(allProducts.data ?? []).map((data, index) => (
            <ProductCard isCatalog data={data} key={index} />
          ))}
        </ListCatalog>
      </div>

      <ClientOnly>
        <PreviewProduct />
      </ClientOnly>
    </div>
  );
}
