import { CardDefault } from "@/components/CardDefault";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex-1 bg-red-300 p-4">
      <div className="grid grid-cols-4 gap-2">
        <Link href="/dashboard/product">
          <CardDefault>Produtos</CardDefault>
        </Link>
        <Link href="/dashboard/">
          <CardDefault>Categorias</CardDefault>
        </Link>
        <Link href="/dashboard/">
          <CardDefault>Transações</CardDefault>
        </Link>

        <CardDefault>card 01</CardDefault>
      </div>
    </div>
  );
}
