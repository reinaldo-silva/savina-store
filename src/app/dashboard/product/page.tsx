import { CardDefault } from "@/components/CardDefault";
import { ClientOnly } from "@/components/ClientOnly";
import { Heading } from "@/components/Heading";
import { DeleteDialog } from "@/components/pages/product-manager/DeleteDialog";
import {
  EditProductLink,
  FormProductProvider,
} from "@/components/pages/product-manager/FormContext";
import { ProductForm } from "@/components/pages/product-manager/ProductForm";
import { SwitchAvailableButton } from "@/components/pages/product-manager/SwitchAvailableButton";
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
import { getProductsToAdmin } from "@/services/productService";
import {
  CaretRight,
  CaretLeft,
  ImageBroken,
  Link as LinkIcon,
  SmileySad,
} from "@phosphor-icons/react/dist/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense, use } from "react";

type PaginationStatus = {
  canGoNext: boolean;
  canGoPrev: boolean;
};

function getPaginationStatus(
  currentPage: number,
  totalPages: number,
): PaginationStatus {
  return {
    canGoNext: currentPage < totalPages,
    canGoPrev: currentPage > 1,
  };
}

export default function ProductManagerPage({
  searchParams: { page },
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const currentPage = isNaN(Number(page)) ? 1 : Number(page);
  const totalPages = 20;

  const token = cookies().get("APP_SAVINA:token")?.value ?? "";
  const allCategories = use(getCategories());
  const allProducts = use(
    getProductsToAdmin({ size: String(totalPages), token, page }),
  );
  const { canGoNext, canGoPrev } = getPaginationStatus(currentPage, totalPages);

  if (!allProducts.data) {
    return null;
  }

  return (
    <FormProductProvider>
      <div className="flex-1 space-y-4 p-2 md:p-4">
        <div className="flex justify-between">
          <Heading as="h4">Gestão de produtos</Heading>

          <div className="flex items-center gap-2">
            <RefreshData />
            <Suspense>
              <ProductForm categories={allCategories.data ?? []} />
            </Suspense>
          </div>
        </div>
        <ScrollArea className="w-[calc(100vw-16px)] md:w-[calc(100vw-32px)] lg:w-auto">
          <CardDefault className="!p-0">
            <Table>
              <TableCaption className="relative pb-4">
                {allProducts.data[0] ? (
                  <Text>Uma listagem dos produtos recentes.</Text>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <Text>Nenhum produto foi encontardo</Text>
                    <SmileySad />
                  </div>
                )}

                <div className="absolute bottom-0 right-0 flex h-14 items-center justify-center gap-4 px-4">
                  <Link
                    className="border p-2"
                    href={`/dashboard/product?page=${canGoPrev ? currentPage - 1 : 1}`}
                  >
                    <CaretLeft />
                  </Link>
                  {currentPage}
                  <Link
                    className="border p-2"
                    href={`/dashboard/product?page=${canGoNext ? currentPage + 1 : currentPage}`}
                  >
                    <CaretRight />
                  </Link>
                </div>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-14"></TableHead>
                  <TableHead className="w-[100px]">Slug</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Habilitado</TableHead>
                  <TableHead className="w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProducts.data.map((product) => {
                  const currentImage = product.images.find((e) => e.is_cover);
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="w-14 p-2 text-center font-medium">
                        {currentImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="size-10 rounded-sm object-cover"
                            alt="Prev. imagem"
                            src={currentImage.image_url}
                            height={100}
                            width={100}
                          />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-sm bg-zinc-200">
                            <ImageBroken className="text-zinc-400" size={20} />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="p-1">
                        <Button variant="link">
                          <Link
                            target="_blank"
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
                      <TableCell>
                        <SwitchAvailableButton
                          slug={product.slug}
                          checked={product.available}
                        />
                      </TableCell>
                      <TableCell className="inline-flex space-x-2">
                        <ClientOnly>
                          <DeleteDialog
                            productName={product.name}
                            slugId={product.slug}
                          />
                        </ClientOnly>
                        <ClientOnly>
                          <EditProductLink slugId={product.slug} />
                        </ClientOnly>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardDefault>
        </ScrollArea>
      </div>
    </FormProductProvider>
  );
}
