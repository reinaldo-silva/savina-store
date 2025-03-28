"use client";
import { SearchInput } from "@/components/pages/search/SearchInput";
import useComponentWidth from "@/hook/useComponentWidth";
import { useRootContext } from "@context/RootContext";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { PropsWithChildren } from "react";

interface ProductListProps extends PropsWithChildren {
  defaultFilter: {
    name: string;
    cat: string;
  };
  total?: number;
}

export function ProductList({
  children,
  total,
  defaultFilter,
}: ProductListProps) {
  const { filterOpen } = useRootContext();
  const { ref, width } = useComponentWidth();

  const props = useSpring({
    paddingTop: filterOpen ? 16 : 106,
    delay: filterOpen ? 300 : 0,
    config: { duration: 200 },
  });

  return (
    <animated.div
      style={props}
      className="relative flex min-h-[calc(100svh-72px-60px-32px)] flex-1 flex-col overflow-x-hidden overflow-y-scroll p-4 md:min-h-[calc(100svh-133px)]"
    >
      <div className="absolute left-0 top-0 w-full p-4">
        <SearchInput total={total} name={defaultFilter.name} />
      </div>

      <div
        ref={ref}
        className={clsx("grid gap-4", {
          "grid-cols-2": width > 450,
          "grid-cols-3": width > 700,
          "grid-cols-4": width > 1000,
          "grid-cols-5": width > 1200,
        })}
      >
        {children}
      </div>
    </animated.div>
  );
}
