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
          <Link href="/" className="w-[88px]">
            <Image
              className="size-10 min-w-10"
              src="/logo.svg"
              alt="Logo"
              width={400}
              height={400}
            />
          </Link>

          {pathname === "/search" && (
            <Image
              src="/desc.svg"
              className="h-8 w-[200px] object-contain"
              alt="Logo"
              width={400}
              height={400}
            />
          )}

          {pathname !== "/search" && <SearchInput name="" />}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="size-10 rounded-full border-2 bg-zinc-100 shadow"
            >
              <User size={24} />
            </Button>
            <Button
              variant="ghost"
              className="size-10 rounded-full border-2 bg-zinc-100 shadow"
            >
              <ShoppingCart size={24} />
            </Button>
          </div>
        </header>
        <div className="mx-auto hidden max-w-screen-xl justify-between px-1 pb-0 md:flex">
          <div>
            <Link href="#about">
              <Button variant="link">Sobre nós</Button>
            </Link>
            <Link href="#categories">
              <Button variant="link">Principais categoria</Button>
            </Link>
          </div>
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
