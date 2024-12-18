"use client";
import { useRootContext } from "@/app/(root)/RootContext";
import { SearchInput } from "@/components/pages/search/SearchInput";
import { Text } from "@/components/Text";
import useComponentWidth from "@/hook/useComponentWidth";
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
    paddingTop: filterOpen ? 16 : 96,
    delay: filterOpen ? 300 : 0,
    config: { duration: 200 },
  });

  return (
    <animated.div
      style={props}
      className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-scroll p-4"
    >
      <div className="absolute left-0 top-0 w-full p-4">
        <SearchInput name={defaultFilter.name} />
      </div>
      <Text className="pb-2 font-medium text-muted-foreground" size="sm">
        {total} produtos encontrados.
      </Text>

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
