import { ClientOnly } from "@/components/ClientOnly";
import { Heading } from "@/components/Heading";
import { ListCatalog } from "@/components/pages/catalog/ListCatalog";
import { PreviewProduct } from "@/components/pages/catalog/PreviewProduct";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/services/productService";
import Image from "next/image";
import { use } from "react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const defaultFilter = {
    cat: (searchParams.cat || "") as string,
    name: (searchParams.name || "") as string,
    size: "100",
  };

  const allProducts = use(getProducts(defaultFilter));

  if (allProducts.statusCode !== 200) {
    return null;
  }

  return (
    <div className="flex h-svh flex-col items-center justify-center overflow-hidden bg-orange-100">
      <div className="w-full max-w-screen-md flex-1 overflow-x-hidden overflow-y-scroll border-x bg-zinc-50 px-4 pb-4">
        <header className="flex size-36 w-full items-center justify-between bg-zinc-50">
          <Heading as="h2" className="font-normal !text-default">
            Catalogo de produtos
          </Heading>
          <Image
            className="size-20"
            src="/logo-desc.svg"
            alt="Logo"
            width={400}
            height={400}
          />
        </header>

        <ListCatalog>
          <ClientOnly>
            {(allProducts.data ?? []).map((data, index) => (
              <ProductCard isCatalog data={data} key={index} />
            ))}
          </ClientOnly>
        </ListCatalog>
      </div>

      <ClientOnly>
        <PreviewProduct />
      </ClientOnly>
    </div>
  );
}
