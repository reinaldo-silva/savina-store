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
import { ArrowRight, Package, PackageMinus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  product: z.string().optional(),
  output: z.string().refine(
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

export function DialogSubProduct({ products }: DialogAddProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, start, stop } = useLoading();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      output: "",
    },
  });

  function onSubmit({ output }: z.infer<typeof FormSchema>) {
    if (!currentProduct) {
      return;
    }

    if (Number(output) > currentProduct.stock) {
      toast("Quantidade de saída excedida");
      return;
    }

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
          <Heading as="h3">Saída</Heading>
          <PackageMinus />
        </CardDefault>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saída de produtos</DialogTitle>
          <DialogDescription>
            Selecione um produto para dar baixa no estoque
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
                  <Text className="flex items-center gap-1 text-muted-foreground">
                    <Package className="mr-1" />
                    <span className="font-bold text-muted-foreground">
                      {currentProduct.stock}{" "}
                    </span>
                    {form.watch("output") && (
                      <>
                        <span className="font-bold text-red-500">
                          - {form.watch("output")}
                        </span>
                        <ArrowRight />
                        <span className="font-bold text-muted-foreground">
                          {currentProduct.stock - Number(form.watch("output"))}
                        </span>
                      </>
                    )}
                  </Text>
                </div>
                <FormField
                  control={form.control}
                  name="output"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Quantidade da saída</FormLabel>
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
