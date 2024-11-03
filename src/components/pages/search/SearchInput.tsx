"use client";
import { useRootContext } from "@/app/(root)/RootContext";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { Filter, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string(),
});

export function SearchInput({ name }: { name: string }) {
  const { push } = useRouter();
  const { toggleFilter, filterOpen } = useRootContext();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
    },
  });

  function onSubmit({ name }: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams();

    if (name) {
      params.append("name", name);
    }

    const url = `/search${params.toString() ? `?${params.toString()}` : ""}`;
    push(url);
  }

  const opacityProps = useSpring({
    opacity: filterOpen ? 0 : 1,
    delay: !filterOpen ? 300 : 0,
    config: { duration: 300 },
  });

  const transformProps = useSpring({
    transform: !filterOpen ? "translateX(0px)" : "translateX(100%)",
    delay: 300,
    config: { duration: 200 },
  });

  const buttonWidthProps = useSpring({
    width: form.getValues("name") ? 34 : 0,
    config: { duration: 400 },
  });

  const buttonOpacityProps = useSpring({
    opacity: form.getValues("name") ? 1 : 0,
    delay: form.getValues("name") ? 400 : 0,
    config: { duration: 200 },
  });

  useEffect(() => {
    if (pathname !== "/search" && filterOpen) {
      toggleFilter();
    }
  }, [filterOpen, pathname, toggleFilter]);

  return (
    <animated.div
      style={{ ...transformProps, ...opacityProps }}
      className={clsx("w-full flex-col space-y-4 md:flex", {
        hidden: pathname !== "/search",
      })}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 space-x-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="group flex flex-1 border-2 border-zinc-200 bg-zinc-100 transition focus-within:border-default focus-within:bg-white hover:border-default hover:bg-white">
                  <FormControl>
                    <input
                      placeholder="Ex: Aliança de ouro"
                      className="flex h-9 w-full bg-transparent px-3 py-2 text-base outline-none placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <div className="!mt-0 flex gap-2 p-1">
                    <animated.button
                      style={{ ...buttonOpacityProps, ...buttonWidthProps }}
                      className="!mt-0 h-full px-2 text-zinc-800 transition hover:opacity-80"
                      type="reset"
                      onClick={() => {
                        if (pathname === "/search") push("/search");
                        form.reset({ name: "" });
                      }}
                    >
                      <X strokeWidth={3} size={18} />
                    </animated.button>

                    <button
                      disabled={!field.value}
                      className="!mt-0 h-full bg-default px-2 text-zinc-50 transition hover:opacity-80 disabled:opacity-70"
                      type="submit"
                    >
                      <Search strokeWidth={3} size={18} />
                    </button>
                    {pathname === "/search" && (
                      <button
                        onClick={toggleFilter}
                        className="!mt-0 flex h-full items-center bg-default px-2 font-bold text-zinc-50 transition hover:opacity-80"
                        type="button"
                      >
                        Filtros
                        <Filter strokeWidth={3} size={16} className="ml-1" />
                      </button>
                    )}
                  </div>
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
      {pathname === "/search" && <Separator />}
    </animated.div>
  );
}
