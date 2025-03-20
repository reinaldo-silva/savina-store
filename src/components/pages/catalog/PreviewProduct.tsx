"use client";
import { CardDefault } from "@/components/CardDefault";
import { Heading } from "@/components/Heading";
import { CarouselSection } from "@/components/pages/product-slug/CarouselSection";
import { Text } from "@/components/Text";
import { useClickOutside } from "@/hook/useClickOutside";
import { useLoading } from "@/hook/useLoading";
import { getProductBySlug, Product } from "@/services/productService";
import { formatPrice } from "@/utils/formatPrice";
import {
  CircleNotch,
  InstagramLogo,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PreviewProduct() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const id = searchParams.get("id");
  const { isLoading, start, stop } = useLoading();
  const [product, setProduct] = useState<null | Product>(null);

  const divRef = useRef<HTMLDivElement>(null);

  useClickOutside(divRef, () => {
    replace(`/catalog`);
  });

  const backgroundProps = useSpring({
    transform: id ? "translateX(0px)" : "translateX(100%)",
    opacity: id ? 1 : 0,
    config: { duration: 200 },
  });

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const message = `Olá, tenho interesse nesse produto: ${window.location.href}`;
  const encodedMessage = encodeURIComponent(message);

  useEffect(() => {
    if (id) {
      start();
      getProductBySlug({ slug: id })
        .then((response) => {
          setProduct(response.data);
        })
        .finally(() => stop());
    }
  }, [id, start, stop]);

  return (
    <animated.div
      style={{ ...backgroundProps }}
      className="absolute left-0 top-0 flex h-svh w-full items-center justify-center overflow-hidden p-2"
    >
      <div className="absolute left-0 top-0 h-full w-full bg-zinc-950/40" />
      <CardDefault
        ref={divRef}
        className="relative z-10 flex h-auto max-h-[100%] w-full max-w-screen-sm flex-col overflow-y-scroll bg-red-50 p-2 md:size-auto"
      >
        {!isLoading && (
          <Link
            href={`/catalog`}
            className="absolute right-3 top-3 rounded-md bg-red-500 p-0.5"
          >
            <X className="text-zinc-50" weight="bold" />
          </Link>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center space-y-2">
            <CircleNotch className="size-8 animate-spin" />

            <Text>Carregando...</Text>
          </div>
        ) : (
          <>
            {product && (
              <>
                <Text className="font-semibold text-muted-foreground">
                  #{product?.slug}
                </Text>
                <Heading className="mb-2">{product?.name}</Heading>

                <div className="relative flex max-h-[30px] min-h-[300px] items-center overflow-hidden sm:max-h-[360px] sm:min-h-[360px]">
                  <CarouselSection images={product.images} isCatalog />
                </div>
                <div className="flex items-center justify-between">
                  <Heading as="h1" className="my-4">
                    {formatPrice(product.price)}
                  </Heading>

                  <div className="flex items-center gap-1">
                    <Link
                      className="self-start p-1"
                      target="_blank"
                      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
                    >
                      <WhatsappLogo weight="bold" size={32} />
                    </Link>
                    <Link
                      className="self-start p-1"
                      target="_blank"
                      href={`http://instagram.com/savina.acessorios`}
                    >
                      <InstagramLogo weight="bold" size={32} />
                    </Link>
                  </div>
                </div>

                <Heading as="h5" className="font-semibold">
                  Descrição do produto
                </Heading>
                <Text className="leading-relaxed">{product.description}</Text>
              </>
            )}
          </>
        )}
      </CardDefault>
    </animated.div>
  );
}
