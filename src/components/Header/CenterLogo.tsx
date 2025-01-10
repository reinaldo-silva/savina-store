"use client";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function CenterLogo() {
  const pathname = usePathname();

  return (
    <Image
      src="/desc.svg"
      className={clsx("flex h-8 w-[70px] object-contain md:w-[200px]", {
        "md:hidden": pathname !== "/search",
      })}
      alt="Logo"
      width={400}
      height={400}
    />
  );
}
