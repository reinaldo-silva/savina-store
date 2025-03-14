"use client";
import useComponentWidth from "@/hook/useComponentWidth";
import clsx from "clsx";
import { PropsWithChildren } from "react";

export function ListCatalog({ children }: PropsWithChildren) {
  const { ref, width } = useComponentWidth();

  return (
    <div
      ref={ref}
      className={clsx("grid gap-4", {
        "grid-cols-2": width > 300,
        "grid-cols-3": width > 700,
        "grid-cols-4": width > 1000,
        "grid-cols-5": width > 1200,
      })}
    >
      {children}
    </div>
  );
}
