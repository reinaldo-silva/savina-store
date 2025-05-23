"use client";
import { useIsMobile } from "@/hook/useIsMobile";
import { Category } from "@/services/categoriesService";
import { CategorySelector } from "@components/CategorySelector";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useRootContext } from "@context/RootContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Funnel, X } from "@phosphor-icons/react";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SearchFormProps {
  categories: Category[];
  defaultFilter: {
    name: string;
    cat: string;
  };
}

const FormSchema = z.object({
  name: z.string(),
  categories: z.array(z.object({ id: z.number() })),
});

export function SearchForm({
  categories,
  defaultFilter: { cat, name },
}: SearchFormProps) {
  const { filterOpen, toggleFilter } = useRootContext();
  const { push } = useRouter();
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      categories: cat ? cat.split(",").map((e) => ({ id: Number(e) })) : [],
    },
  });

  function onSubmit({ name, categories }: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams();

    if (name) {
      params.append("name", name);
    }

    if (categories.length > 0) {
      params.append("cat", categories.map((e) => e.id).join(","));
    }

    const url = `/search${params.toString() ? `?${params.toString()}` : ""}`;
    if (isMobile) toggleFilter();
    push(url);
  }

  function resetForm() {
    push("/search");
    form.reset({ name: "", categories: [] });
  }

  const widthAndPaddingProps = useSpring({
    width: filterOpen ? 300 : 0,
    padding: filterOpen ? 16 : 0,
    delay: !filterOpen ? 300 : 0,
    config: { duration: 300 },
  });

  const opacityAndTransformProps = useSpring({
    opacity: filterOpen ? 1 : 0,
    transform: filterOpen ? "translateX(0px)" : "translateX(-20px)",
    delay: filterOpen ? 300 : 0,
    config: { duration: 200 },
  });

  useEffect(() => {
    form.setValue("name", name);
    form.setValue(
      "categories",
      cat
        ? cat.split(",").map((e) => ({
            id: Number(e),
          }))
        : [],
    );
  }, [cat, name, form]);

  return (
    <animated.div
      className={clsx("overflow-hidden", { "max-sm:!w-screen": filterOpen })}
      style={{ ...opacityAndTransformProps, ...widthAndPaddingProps }}
    >
      <div className="relative flex flex-col">
        <button
          className="absolute -right-1 -top-1 p-2 hover:opacity-60"
          onClick={toggleFilter}
        >
          <X size={16} />
        </button>
        <div className="flex items-center gap-2 truncate">
          <Funnel size={16} />
          <Heading as="h5" className="font-base">
            Filtros
          </Heading>
        </div>
        <Text size="sm" className="truncate font-light text-muted-foreground">
          Faça uma pesquisa mais detalhada
        </Text>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="truncate">Nome do produto</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Aliança de ouro" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex flex-col">
            <CategorySelector
              defaultValues={cat ? cat.split(",").map(Number) : []}
              categories={categories}
              onChange={(catArray) =>
                form.setValue(
                  "categories",
                  catArray.map((e) => ({ id: e })),
                )
              }
            />
          </FormItem>

          <div className="space-x-2 truncate">
            <Button type="submit">Submit</Button>
            <Button type="reset" onClick={resetForm} variant="destructive">
              Limpar filtros
            </Button>
          </div>
        </form>
      </Form>
    </animated.div>
  );
}
