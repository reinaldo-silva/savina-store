"use client";
import { useClickOutside } from "@/hook/useClickOutside";
import { useLoading } from "@/hook/useLoading";
import { getProductBySlug, Product } from "@/services/productService";
import { formatPrice } from "@/utils/formatPrice";
import { CardDefault } from "@components/CardDefault";
import { Heading } from "@components/Heading";
import { CarouselSection } from "@components/pages/product-slug/CarouselSection";
import { Text } from "@components/Text";
import {
  ArrowLeft,
  CircleNotch,
  InstagramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
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

  const isAvailable = product ? product.stock > 0 : false;

  return (
    <animated.div
      style={{ ...backgroundProps }}
      className="absolute left-0 top-0 flex h-svh w-full items-center justify-center overflow-hidden p-2"
    >
      <div className="absolute left-0 top-0 h-full w-full bg-zinc-950/40" />
      <CardDefault
        ref={divRef}
        className="relative z-10 flex h-auto max-h-[100%] w-full max-w-screen-sm flex-col overflow-y-scroll rounded-lg bg-red-50 !p-0 md:size-auto"
      >
        {!isLoading && (
          <>
            <Link
              href={`/catalog`}
              className="absolute left-3 top-3 z-10 rounded-full border bg-zinc-50 p-3"
            >
              <ArrowLeft weight="bold" />
            </Link>
            <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
              <Link
                className="self-start rounded-full border bg-zinc-50 p-2"
                target="_blank"
                href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
              >
                <WhatsappLogo weight="bold" size={28} />
              </Link>
              <Link
                className="self-start rounded-full border bg-zinc-50 p-2"
                target="_blank"
                href={`http://instagram.com/savina.acessorios`}
              >
                <InstagramLogo weight="bold" size={28} />
              </Link>
            </div>
          </>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center space-y-2 p-4">
            <CircleNotch className="size-8 animate-spin" />

            <Text>Carregando...</Text>
          </div>
        ) : (
          <>
            {product && (
              <>
                <div className="relative flex max-h-[30px] min-h-[400px] items-center overflow-hidden sm:max-h-[360px] sm:min-h-[360px]">
                  <CarouselSection images={product.images} isCatalog />
                </div>
                <section className="p-2 px-3">
                  <Text
                    className={clsx("text-sm font-semibold", {
                      "text-green-500": isAvailable,
                      "text-red-500": !isAvailable,
                    })}
                  >
                    {isAvailable ? "Disponível" : "Esgotado"}
                  </Text>
                  <div className="flex items-start justify-between gap-2">
                    <Heading as="h3">{product?.name}</Heading>

                    <Heading as="h5" className="font-semibold">
                      {formatPrice(product.price)}
                    </Heading>
                  </div>

                  <Text className="text-sm font-semibold text-muted-foreground">
                    #{product?.slug}
                  </Text>

                  <Text className="mt-2 leading-relaxed">
                    {product.description}
                  </Text>
                </section>
              </>
            )}
          </>
        )}
      </CardDefault>
    </animated.div>
  );
}
