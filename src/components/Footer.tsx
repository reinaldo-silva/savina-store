import Image from "next/image";
import { Heading } from "@/components/Heading";
import { CreditCard, Package, Instagram, Mail } from "lucide-react";
import { Text } from "@/components/Text";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Category } from "@/services/categoriesService";

export function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="w-full bg-zinc-800 px-2">
      <div className="mx-auto flex max-w-screen-lg flex-col px-10 pt-10">
        <div className="flex w-full flex-col items-center gap-2">
          <div className="size-20 rounded-full bg-zinc-200 p-2">
            <Image
              className="h-full w-full"
              width={200}
              height={200}
              alt=""
              src="/logo.svg"
            />
          </div>
          <Heading as="h5" className="text-zinc-100">
            Savina acessórios
          </Heading>
        </div>

        <Heading
          as="h4"
          className="mt-10 w-full translate-y-0 text-center text-zinc-100 md:translate-y-8"
        >
          Em breve
        </Heading>
        <section className="flex flex-col items-center justify-around gap-4 py-8 text-zinc-100 md:flex-row">
          <div className="flex flex-col items-center gap-2">
            <Package size={80} strokeWidth={1} />
            <Heading as="h5" className="text-center text-zinc-100">
              Entrega em Todo o Brasil
            </Heading>
            <Text className="text-center" size="sm">
              Receba os produtos favoritos da Savina em qualquer lugar do
              Brasil, com segurança e rapidez.
            </Text>
          </div>
          <Separator
            orientation="vertical"
            className="hidden h-[100px] bg-zinc-600 md:flex"
          />
          <div className="flex flex-col items-center gap-2">
            <CreditCard size={80} strokeWidth={1} />
            <Heading as="h5" className="text-zinc-100">
              Compre Online
            </Heading>
            <Text className="text-center" size="sm">
              Compre de forma prática e segura em nossa loja online e receba
              diretamente na sua porta.
            </Text>
          </div>
        </section>
      </div>
      <Separator className="mx-auto max-w-screen-lg bg-zinc-600" />

      <div className="mx-auto flex max-w-screen-lg flex-col-reverse justify-between gap-4 px-8 py-10 md:flex-row">
        <div className="">
          <Heading as="h4" className="text-zinc-100">
            Nossos canais de comunicação
          </Heading>

          <div className="flex flex-col items-start">
            <Link href="http://instagram.com/savina.acessorios">
              <Button variant="link" className="p-0 text-zinc-300">
                <Instagram />
                <Text>instagram.com/savina.acessorios</Text>
              </Button>
            </Link>
            <Link href="http://instagram.com/savina.acessorios">
              <Button variant="link" className="p-0 text-zinc-300">
                <Mail />
                <Text>marialuizatomicioli@gmail.com</Text>
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div>
            <Heading as="h4" className="text-zinc-100">
              Categorias do catálogo
            </Heading>

            <ul className="flex flex-col">
              {categories.map((e, index) => (
                <Link key={index} href={`/search?cat=${e.id}`}>
                  <Button variant="link" className="p-0 py-2 text-zinc-300">
                    <Text>{e.name}</Text>
                  </Button>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
