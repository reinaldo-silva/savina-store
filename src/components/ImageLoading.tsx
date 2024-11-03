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

  return (
    <div
      className={clsx("flex h-full w-full flex-1 items-center justify-center", {
        "animate-pulse bg-zinc-300": isLoading,
      })}
    >
      <Image
        onLoad={() => {
          setIsLoading(false);
        }}
        priority
        width={400}
        height={400}
        src={url}
        alt={alt}
        className={clsx("h-full w-full object-cover", classNameImage)}
      />
    </div>
  );
}
