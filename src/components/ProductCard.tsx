import { Text } from "@/components/Text";
import { Product } from "@/services/productService";
import { formatPrice } from "@/utils/formatPrice";
import {
  Link as ExternalLink,
  ImageBroken,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Link from "next/link";

export function ProductCard({
  data: { images, name, price, slug, stock },
  isCatalog = false,
  grayscale,
}: {
  data: Product;
  isCatalog?: boolean;
  grayscale?: boolean;
}) {
  const imageCover = images.find((e) => e.is_cover) ?? images[0];
  const isAvailable = stock > 0;

  return (
    <Link href={isCatalog ? `/catalog?id=${slug}` : `/product/${slug}`}>
      <button className="group flex w-full cursor-pointer flex-col space-y-1">
        <div className="relative flex h-40 w-full items-center justify-center overflow-hidden bg-zinc-200 shadow-md sm:h-64">
          {imageCover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={name}
              // priority
              className={clsx(
                "h-full w-full object-cover transition duration-500 group-hover:scale-110",
                { grayscale: grayscale },
              )}
              src={imageCover.image_url}
              width={300}
              height={400}
            />
          ) : (
            <ImageBroken size={44} strokeWidth={2} className="text-zinc-300" />
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

        {isCatalog && (
          <div className="w-full border-b py-1">
            <Text
              className={clsx("font-semibold", {
                "text-green-500": isAvailable,
                "text-red-500": !isAvailable,
              })}
            >
              {isAvailable ? "Disponível" : "Esgotado"}
            </Text>
          </div>
        )}
      </button>
    </Link>
  );
}
