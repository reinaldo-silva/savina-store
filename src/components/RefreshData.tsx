"use client";
import { useLoading } from "@/hook/useLoading";
import clsx from "clsx";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function RefreshData() {
  const { refresh } = useRouter();
  const { isLoading, start, stop } = useLoading();

  async function handleRefresh() {
    start();
    await fetch("/api/revalidate/products", { method: "GET" }).then(() => {
      toast("Dados atualizados!", { duration: 3000 });
      refresh();
      stop();
    });
  }

  return (
    <Button onClick={handleRefresh}>
      <RotateCcw
        strokeWidth={3}
        className={clsx({
          "animate-spin duration-100 repeat-infinite": isLoading,
        })}
      />
    </Button>
  );
}
