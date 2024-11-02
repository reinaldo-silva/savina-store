"use client";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLoading } from "@/hook/useLoading";
import { deleteProduct } from "@/services/productService";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteDialogProps {
  slugId: string;
  productName: string;
}

export function DeleteDialog({ slugId, productName }: DeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { refresh } = useRouter();
  const { isLoading, start, stop } = useLoading();

  async function handleDelete() {
    start();
    try {
      await deleteProduct(slugId);

      await fetch("/api/revalidate/products", { method: "GET" }).then(() => {
        toast("Produto deletado com sucesso!");
        refresh();
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Erro:", error);
    }
    stop();
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button
          onClick={() => setIsOpen(true)}
          type="button"
          variant="ghost"
          className="flex size-8 items-center justify-center rounded hover:bg-zinc-200"
        >
          <Trash2 size={20} className="text-zinc-700" />
        </Button>
        <DialogContent>
          <DialogHeader>
            <Text className="font-medium text-muted-foreground" size="xs">
              #{slugId}
            </Text>
            <DialogTitle>{`Deseja mesmo deletar o produto ${productName}?`}</DialogTitle>
            <DialogDescription>
              Essa ação não poderá ser revertida!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={handleDelete}
              isLoading={isLoading}
              type="button"
              variant="destructive"
            >
              Deletar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
