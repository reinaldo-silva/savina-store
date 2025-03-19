import { CardDefault } from "@/components/CardDefault";
import { Heading } from "@/components/Heading";
import { DialogAddProduct } from "@/components/pages/dashboard/DialogAddProduct";
import { DialogSubProduct } from "@/components/pages/dashboard/DialogSubProduct";
import { getProductsToAdmin } from "@/services/productService";
import { Tag, Package } from "@phosphor-icons/react/dist/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { use } from "react";

export default function DashboardPage() {
  const token = cookies().get("APP_SAVINA:token")?.value ?? "";

  const allProducts = use(getProductsToAdmin({ size: "100", token }));

  if (!allProducts.data) {
    return null;
  }

  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-4 gap-2">
        <Link href="/dashboard/product">
          <CardDefault className="flex items-center justify-between">
            <Heading as="h3">Produtos</Heading>
            <Package />
          </CardDefault>
        </Link>
        <Link href="/dashboard/categories">
          <CardDefault className="flex items-center justify-between">
            <Heading as="h3">Categorias</Heading>
            <Tag />
          </CardDefault>
        </Link>

        <DialogAddProduct products={allProducts.data} />

        <DialogSubProduct products={allProducts.data} />
      </div>
    </div>
  );
}
