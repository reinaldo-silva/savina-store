"use client";
import { CategorySelector } from "@/components/CategorySelector";
import { ImageSelector } from "@/components/ImagesSelctor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  createProduct,
  getProductBySlug,
  updateProduct,
  uploadProductImages,
} from "@/services/productService";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  images: z.array(z.instanceof(File)),
});

interface SearchFormProps {
  categories: Category[];
}

export function CreateProductForm({ categories }: SearchFormProps) {
  const [open, setOpen] = useState(false);
  const { refresh } = useRouter();
  const { isLoading, start, stop } = useLoading();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit({ images, ...data }: z.infer<typeof FormSchema>) {
    start();
    try {
      const slugId = await createProduct(data);

      await uploadProductImages(slugId, images);

      await fetch("/api/revalidate/products", { method: "GET" }).then(() => {
        toast("Produto criado com sucesso!");
        refresh();
      });

      setOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
    stop();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            form.reset();
          }}
        >
          Novo produto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Digite os dados necessário para criar um produto
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-2"
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
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="col-span-full row-start-4 flex flex-col">
              <CategorySelector
                defaultValues={form
                  .getValues("categories")
                  ?.map(({ id }) => id)}
                categories={categories}
                onChange={(catArray) =>
                  form.setValue(
                    "categories",
                    catArray.map((e) => ({ id: e })),
                  )
                }
              />
            </FormItem>

            <FormItem className="col-span-full row-start-5 flex flex-col">
              <ImageSelector
                onChange={(files) => {
                  form.setValue("images", files);
                }}
              />
            </FormItem>

            <div className="col-span-full row-start-6 mt-2 flex flex-wrap gap-2">
              <Button
                isLoading={isLoading}
                type="submit"
                className="w-full sm:w-auto"
              >
                Cadastrar Produto
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
      </DialogContent>
    </Dialog>
  );
}

export function EditProductForm({ categories }: SearchFormProps) {
  const [open, setOpen] = useState(false);
  const { push, replace, refresh } = useRouter();
  const { isLoading, start, stop } = useLoading();
  const {
    isLoading: loadingProduct,
    start: startLoadingProduct,
    stop: stopLoadingProduct,
  } = useLoading();
  const editSlug = useSearchParams().get("edit");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit({ images, ...data }: z.infer<typeof FormSchema>) {
    console.log(images);

    start();
    try {
      if (editSlug) {
        await updateProduct(editSlug, data);

        await fetch("/api/revalidate/products", { method: "GET" }).then(() => {
          toast("Produto alterado com sucesso!");
          setOpen(false);
          stop();
          replace("/dashboard/product", undefined);
          refresh();
        });

        return;
      }
    } catch (error) {
      console.error("Erro ao editar o produto:", error);
      stop();
    }
  }

  useEffect(() => {
    if (editSlug) {
      setOpen(true);
      startLoadingProduct();
      getProductBySlug({ slug: editSlug })
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
          form.setValue("images", []);
        })
        .catch(() => {
          push("/dashboard/product");
        })
        .finally(() => {
          stopLoadingProduct();
        });
    }
  }, [editSlug, form, push, stopLoadingProduct, startLoadingProduct]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) push(`/dashboard/product`);
        setOpen(open);
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Digite os dados necessário para editar o produto
          </DialogDescription>
        </DialogHeader>

        {loadingProduct ? (
          <div className="flex h-[400px] flex-1 items-center justify-center">
            <LoaderCircle
              className="animate-spin text-[#DD5A12] duration-500"
              size={28}
            />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-3 gap-2"
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
                      <Input
                        placeholder="Ex: 130.90"
                        type="number"
                        {...field}
                      />
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
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem className="col-span-full row-start-4 flex flex-col">
                <CategorySelector
                  defaultValues={form
                    .getValues("categories")
                    ?.map(({ id }) => id)}
                  categories={categories}
                  onChange={(catArray) =>
                    form.setValue(
                      "categories",
                      catArray.map((e) => ({ id: e })),
                    )
                  }
                />
              </FormItem>

              {/* {!editSlug && (
                <FormItem className="col-span-full row-start-5 flex flex-col">
                  <ImageSelector
                    onChange={(files) => {
                      form.setValue("images", files);
                    }}
                  />
                </FormItem>
              )} */}

              <div className="col-span-full row-start-6 mt-2 flex flex-wrap gap-2">
                <Button
                  isLoading={isLoading}
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  Alterar Produto
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
        )}
      </DialogContent>
    </Dialog>
  );
}
