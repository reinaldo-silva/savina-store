"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export function ImageLoading({
  alt,
  url,
  classNameImage,
}: {
  url: string;
  alt: string;
  classNameImage?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState(url);

  return (
    <div
      className={clsx("flex size-full", {
        "animate-pulse bg-zinc-300": isLoading,
      })}
    >
      <Image
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setImg("/no-image.png");
        }}
        priority
        width={800}
        height={800}
        src={img}
        alt={alt}
        className={clsx("flex size-full object-cover", classNameImage)}
      />
    </div>
  );
}
