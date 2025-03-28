import { ClientOnly } from "@/components/ClientOnly";
import { ProductCard } from "@/components/ProductCard";
import { ProductList } from "@/components/pages/search/ProductList";
import { SearchForm } from "@/components/pages/search/SearchForm";
import { getCategories } from "@/services/categoriesService";
import { getProducts } from "@/services/productService";
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
  const allCategories = use(getCategories());

  if (allProducts.statusCode !== 200) {
    return null;
  }

  return (
    <div className="flex max-h-[calc(100svh-164px)] flex-1 md:max-h-[calc(100svh-133px)]">
      <div className="flex flex-col border-r bg-zinc-100">
        {/* Add loading */}
        <SearchForm
          categories={allCategories.data ?? []}
          defaultFilter={defaultFilter}
        />
      </div>

      <ProductList total={allProducts.total} defaultFilter={defaultFilter}>
        {/* Add loading */}
        <ClientOnly>
          {(allProducts.data ?? []).map((data, index) => (
            <ProductCard data={data} key={index} />
          ))}
        </ClientOnly>
      </ProductList>
    </div>
  );
}
