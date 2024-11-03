"use client";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function RefreshData() {
  const { refresh } = useRouter();

  async function handleRefresh() {
    await fetch("/api/revalidate/products", { method: "GET" }).then(() => {
      toast("Dados atualizados!", { duration: 3000 });
      refresh();
    });
  }

  return (
    <Button onClick={handleRefresh}>
      <RotateCcw strokeWidth={3} />
    </Button>
  );
}
