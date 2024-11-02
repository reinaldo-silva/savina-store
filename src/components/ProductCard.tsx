import { Text } from "@/components/Text";
import { Product } from "@/services/productService";
import { formatPrice } from "@/utils/formatPrice";
import { ExternalLink, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  data: { images, name, price, slug },
}: {
  data: Product;
}) {
  const imageCover = images.find((e) => e.is_cover) ?? images[0];

  return (
    <Link href={`/product/${slug}`}>
      <button className="group flex w-full cursor-pointer flex-col space-y-1">
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-zinc-200 shadow-md">
          {imageCover ? (
            <Image
              alt={name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              src={imageCover.image_url}
              width={300}
              height={400}
            />
          ) : (
            <ImageOff size={44} strokeWidth={2} className="text-zinc-300" />
          )}
          <div className="absolute left-0 top-0 flex h-full w-full items-start justify-end bg-zinc-900/40 p-2 opacity-0 transition duration-500 group-hover:opacity-100">
            <ExternalLink size={20} className="text-zinc-200" />
          </div>
        </div>
        <div className="flex w-full flex-col items-start">
          <Text className="w-full truncate text-start text-sm font-semibold">
            {name}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {formatPrice(price)}
          </Text>
        </div>
      </button>
    </Link>
  );
}
