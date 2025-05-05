/* eslint-disable @next/next/no-img-element */
"use client";

import clsx from "clsx";
import { useState } from "react";

export function ImageLoading({
  alt,
  url,
  classNameImage,
  grayscale,
}: {
  url: string;
  alt: string;
  classNameImage?: string;
  grayscale?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState(url);

  return (
    <div
      className={clsx("flex size-full", {
        "animate-pulse bg-zinc-300": isLoading,
      })}
    >
      <img
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setImg("/no-image.png");
        }}
        // priority
        width={800}
        height={800}
        src={img}
        alt={alt}
        className={clsx(
          "flex size-full object-cover",
          { grayscale: grayscale },
          classNameImage,
        )}
      />
    </div>
  );
}
