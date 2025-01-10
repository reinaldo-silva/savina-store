"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export function LinkToFilter({ id, name }: { name: string; id: number }) {
  const currentCategories = useSearchParams().get("cat");
  const pathname = usePathname();

  return (
    <Link href={`/search?cat=${id}`}>
      <Button
        variant="link"
        className={clsx(
          "font-semibold text-muted-foreground transition hover:text-zinc-800",
          {
            "!text-default underline":
              currentCategories === String(id) && pathname === "/search",
          },
        )}
      >
        {name}
      </Button>
    </Link>
  );
}
