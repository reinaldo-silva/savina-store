"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@/services/categoriesService";
import clsx from "clsx";
import { ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchInput } from "./pages/search/SearchInput";

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const currentCategories = useSearchParams().get("cat");

  return (
    <div className="fixed left-0 top-0 z-40 max-h-[104px] w-screen md:max-h-[133px]">
      <div className="flex justify-center bg-zinc-950 py-2 text-xs font-bold uppercase text-white">
        Novidades em breve
      </div>
      <div className="border-b bg-white shadow-sm">
        <header className="mx-auto flex max-h-[72px] w-full max-w-screen-xl items-center justify-between space-x-4 p-4 md:pb-1">
          <Link
            href="/"
            className="flex size-10 w-[88px] items-center justify-start"
          >
            <Image
              className="size-8"
              src="/logo.svg"
              alt="Logo"
              width={400}
              height={400}
            />
          </Link>

          {pathname === "/search" && (
            <Image
              src="/desc.svg"
              className="h-8 w-[100px] object-contain md:w-[200px]"
              alt="Logo"
              width={400}
              height={400}
            />
          )}

          {pathname !== "/search" && <SearchInput name="" />}
          <div className="hidden items-center space-x-2 md:flex">
            <Button variant="ghost" className="size-10" disabled>
              <User size={24} />
            </Button>
            <Button variant="ghost" className="size-10" disabled>
              <ShoppingCart size={24} />
            </Button>
          </div>
        </header>
        <div className="mx-auto hidden max-w-screen-xl justify-center px-1 pb-0 md:flex">
          <div className="">
            {categories.map(({ name, id }, index) => (
              <Link key={index} href={`/search?cat=${id}`}>
                <Button
                  variant="link"
                  className={clsx(
                    "font-semibold text-muted-foreground transition hover:text-zinc-800",
                    {
                      "!text-default underline":
                        currentCategories === String(id) &&
                        pathname === "/search",
                    },
                  )}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
