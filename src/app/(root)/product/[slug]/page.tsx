import { CardDefault } from "@/components/CardDefault";
import { Heading } from "@/components/Heading";
import { CarouselSection } from "@/components/pages/product-slug/CarouselSection";
import { Text } from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/services/productService";
import { formatPrice } from "@/utils/formatPrice";
import { Heart, Instagram } from "lucide-react";
import { use } from "react";

export default function ProductDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = use(getProductBySlug({ slug }));

  const isAvailable = product.data.stock > 0;

  return (
    <div className="hide-scrollbar flex flex-1 flex-col overflow-y-scroll">
      <CarouselSection images={product.data.images} />

      <section className="z-10 mx-auto grid max-w-[1000px] flex-1 grid-cols-2 items-start gap-4 p-4 px-2 md:grid-cols-3 md:px-6">
        <CardDefault className="col-span-2 row-start-1 flex-1">
          <div className="flex items-center justify-between">
            <Text className="text-muted-foreground">#{product.data.slug}</Text>
            <button className="cursor-not-allowed transition hover:opacity-50">
              <Heart size={20} />
            </button>
          </div>

          <Heading as="h1" className="line-clamp-2 font-bold">
            {product.data.name}
          </Heading>

          <Text className="mt-8 text-sm text-muted-foreground">
            Categorias relacionadas
          </Text>
          <div className="my-2 space-x-1">
            {product.data.categories.map((ca, index) => (
              <Badge className="hover:bg-default/20" key={index}>
                {ca.name}
              </Badge>
            ))}
          </div>
        </CardDefault>

        <CardDefault className="col-span-2 col-start-1">
          <Heading as="h5" className="font-semibold">
            Descrição do produto
          </Heading>
          <Text className="mt-2 leading-relaxed">
            {product.data.description}
          </Text>
        </CardDefault>

        <CardDefault className="col-span-2 row-start-2 md:col-span-1 md:row-start-1">
          <Heading className="" as="h1">
            {formatPrice(product.data.price)}
          </Heading>

          <Button className="mt-4 w-full">
            {isAvailable ? "Disponível" : "Esgotado"}
          </Button>
          <Button className="mt-4 w-full" disabled={!isAvailable}>
            Solicitar no Instagram <Instagram />
          </Button>
        </CardDefault>
      </section>
    </div>
  );
}
