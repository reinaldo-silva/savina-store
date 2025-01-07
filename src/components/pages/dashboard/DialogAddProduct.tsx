"use client";
import { CardDefault } from "@/components/CardDefault";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useLoading } from "@/hook/useLoading";
import { Product } from "@/services/productService";
import { findProductInArray } from "@/utils/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Package, PackagePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  product: z.string(),
  entry: z.string().refine(
    (value) => {
      const num = Number(value);
      return !isNaN(num) && num > 0;
    },
    {
      message: "O campo deve ser um número maior que zero",
    },
  ),
});

interface DialogAddProductProps {
  products: Product[];
}

export function DialogAddProduct({ products }: DialogAddProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, start, stop } = useLoading();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      entry: "",
    },
  });

  function onSubmit({ entry }: z.infer<typeof FormSchema>) {
    if (!currentProduct) {
      return;
    }

    console.log(entry);

    start();
    stop();
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        if (e) {
          form.reset();
          setCurrentProduct(null);
        }
        setIsOpen(e);
      }}
    >
      <DialogTrigger>
        <CardDefault className="flex items-center justify-between">
          <Heading as="h3">Entrada</Heading>
          <PackagePlus />
        </CardDefault>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Entrada de produtos</DialogTitle>
          <DialogDescription>
            Selecione um produto para repor o estoque
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-1 py-4"
          >
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione um produto</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                      setCurrentProduct(
                        findProductInArray(products, Number(e)),
                      );
                      form.reset();
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Aliança de exemplo..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((e, index) => (
                        <SelectItem key={index} value={String(e.id)}>
                          <span className="font-medium text-muted-foreground">
                            {e.slug}
                            {" - "}
                          </span>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {currentProduct && (
              <>
                <Separator />
                <div>
                  <Text className="font-semibold">{currentProduct.name}</Text>
                  <Text className="flex gap-2 text-muted-foreground">
                    <Package className="mr-1" />
                    <span className="font-bold text-muted-foreground">
                      {currentProduct.stock}{" "}
                    </span>
                    {form.watch("entry") && (
                      <>
                        <span className="font-bold text-green-500">
                          + {form.watch("entry")}
                        </span>
                        <ArrowRight />
                        <span className="font-bold text-muted-foreground">
                          {currentProduct.stock + Number(form.watch("entry"))}
                        </span>
                      </>
                    )}
                  </Text>
                </div>
                <FormField
                  control={form.control}
                  name="entry"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Qunatidade da entrada</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="digite a quantidade"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <div className="col-span-full row-start-6 mt-2 flex flex-wrap gap-2">
              <Button
                isLoading={isLoading}
                disabled={!currentProduct}
                type="submit"
                className="w-full sm:w-auto"
              >
                Salvar
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                type="button"
                className="w-full sm:w-auto"
                variant="destructive"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
