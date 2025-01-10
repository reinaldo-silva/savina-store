import { Button } from "@/components/ui/button";
import { Category } from "@/services/categoriesService";
import { ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ClientOnly } from "../ClientOnly";
import { SearchInput } from "../pages/search/SearchInput";
import { CenterLogo } from "./CenterLogo";
import { LinkToFilter } from "./LinkToFilter";

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
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

          <ClientOnly
            fallback={
              <div className="h-[36px] w-full animate-pulse bg-zinc-300" />
            }
          >
            <CenterLogo />

            <SearchInput name="" headerConfig={true} />
          </ClientOnly>
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
              <LinkToFilter key={index} id={id} name={name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
