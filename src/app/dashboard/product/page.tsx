import { CardDefault } from "@/components/CardDefault";
import { ClientOnly } from "@/components/ClientOnly";
import { Heading } from "@/components/Heading";
import { DeleteDialog } from "@/components/pages/product-manager/DeleteDialog";
import {
  CreateProductForm,
  EditProductForm,
} from "@/components/pages/product-manager/ProductForm";
import { RefreshData } from "@/components/RefreshData";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/services/categoriesService";
import { getProducts } from "@/services/productService";
import { Frown, ImageOff, LinkIcon, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, use } from "react";

export default function ProductManagerPage() {
  const allCategories = use(getCategories());
  const allProducts = use(getProducts({ size: "100" }));

  if (!allProducts.data) {
    return null;
  }

  return (
    <div className="flex-1 space-y-4 p-2 md:p-4">
      <div className="flex justify-between">
        <Heading as="h4">Gestão de produtos</Heading>

        <div className="flex items-center gap-2">
          <RefreshData />
          <Suspense>
            <CreateProductForm categories={allCategories.data} />
            <EditProductForm categories={allCategories.data} />
          </Suspense>
        </div>
      </div>
      <ScrollArea className="w-[calc(100vw-16px)] md:w-[calc(100vw-32px)] lg:w-auto">
        <CardDefault className="!p-0">
          <Table>
            <TableCaption className="pb-4">
              {allProducts.data[0] ? (
                <Text>Uma listagem dos produtos recentes.</Text>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <Text>Nenhum produto foi encontardo</Text>
                  <Frown />
                </div>
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-14"></TableHead>
                <TableHead className="w-[100px]">Slug</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="w-14 p-2 text-center font-medium">
                    {product.images[0] ? (
                      <Image
                        className="size-10 rounded-sm object-cover"
                        alt="Prev. imagem"
                        src={product.images[0].image_url}
                        height={100}
                        width={100}
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-sm bg-zinc-200">
                        <ImageOff className="text-zinc-400" size={20} />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="p-1">
                    <Button variant="link">
                      <Link
                        href={`/product/${product.slug}`}
                        className="flex items-center gap-2"
                      >
                        {product.slug}
                        <LinkIcon size={16} strokeWidth={3} />
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Text className="max-w-[200px] truncate">
                      {product.name}
                    </Text>
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="inline-flex space-x-2">
                    <ClientOnly>
                      <DeleteDialog
                        productName={product.name}
                        slugId={product.slug}
                      />
                    </ClientOnly>
                    <Link href={`/dashboard/product?edit=${product.slug}`}>
                      <Button
                        variant="ghost"
                        className="flex size-8 items-center justify-center rounded hover:bg-zinc-200"
                      >
                        <Pencil size={20} />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardDefault>
      </ScrollArea>
    </div>
  );
}
