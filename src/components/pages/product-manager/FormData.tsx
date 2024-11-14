"use client";
import { CategorySelector } from "@/components/CategorySelector";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLoading } from "@/hook/useLoading";
import { Category } from "@/services/categoriesService";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useProductFormContext } from "./FormContext";
import { useEffect } from "react";
import {
  createProduct,
  getProductBySlug,
  updateProduct,
} from "@/services/productService";

interface FormDataProps {
  categories: Category[];
  openDialog(): void;
}

const FormSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  price: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive("O preço deve ser positivo"),
  ),
  stock: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number().int().min(1, "Estoque deve ser no mínimo 1"),
  ),
  cost: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive("O custo deve ser positivo"),
  ),
  description: z.string(),
  categories: z.array(z.object({ id: z.number() })),
});

export function FormData({ categories, openDialog }: FormDataProps) {
  const { refresh, push } = useRouter();

  const {
    handleChangeStatus,
    currentStatus: { page, slugId },
  } = useProductFormContext();

  const { isLoading, start, stop } = useLoading();

  const {
    isLoading: loadingProduct,
    start: startLoadingProduct,
    stop: stopLoadingProduct,
  } = useLoading(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    start();
    try {
      if (page === "EDIT") {
        await updateProduct(slugId, data);
      }
      if (page === "CREATE") {
        const slug = await createProduct(data);
        handleChangeStatus({ page: "CREATE", slugId: slug });
      }

      await fetch("/api/revalidate/products", { method: "GET" }).then(() => {
        toast(
          `Produto ${page === "CREATE" ? "criado" : "alterado"} com sucesso!`,
        );
        refresh();
      });
    } catch (error) {
      console.error(
        `Erro ao ${page === "CREATE" ? "cadastrar" : "alterar"} o produto:`,
        error,
      );
    }
    stop();
  }

  useEffect(() => {
    if (page === "EDIT") {
      openDialog();
      startLoadingProduct();
      getProductBySlug({ slug: slugId })
        .then((response) => {
          const {
            name,
            categories: cat,
            cost,
            description,
            price,
            stock,
          } = response.data;

          form.setValue("name", name);
          form.setValue("cost", cost);
          form.setValue("price", price);
          form.setValue("stock", stock);
          form.setValue("description", description);
          form.setValue(
            "categories",
            cat.map(({ id }) => ({ id })),
          );
        })
        .catch(() => {
          push("/dashboard/product");
        })
        .finally(() => {
          stopLoadingProduct();
        });
    }

    if (page === "CREATE") {
      form.reset();
      stopLoadingProduct();
    }
  }, [
    form,
    push,
    stopLoadingProduct,
    startLoadingProduct,
    openDialog,
    page,
    slugId,
  ]);

  if (loadingProduct) {
    return (
      <div className="flex h-[400px] flex-1 items-center justify-center">
        <LoaderCircle
          className="animate-spin text-default duration-500"
          size={28}
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-2 p-1"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Aliança de ouro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custo</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 75.00" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 130.90" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 3" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-3 row-start-3">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição do produto"
                  rows={12}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="col-span-full row-start-4 flex flex-col">
          <CategorySelector
            defaultValues={form.getValues("categories")?.map(({ id }) => id)}
            categories={categories}
            onChange={(catArray) =>
              form.setValue(
                "categories",
                catArray.map((e) => ({ id: e })),
              )
            }
          />
        </FormItem>

        <div className="col-span-full row-start-6 mt-2 flex flex-wrap gap-2">
          <Button
            isLoading={isLoading}
            type="submit"
            className="w-full sm:w-auto"
          >
            {page === "CREATE" ? "Cadastrar" : "Alterar"} Produto
          </Button>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="w-full sm:w-auto"
              variant="destructive"
            >
              Cancelar
            </Button>
          </DialogTrigger>
        </div>
      </form>
    </Form>
  );
}
