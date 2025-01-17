"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/services/categoriesService";
import { useEffect, useState } from "react";
import { useProductFormContext } from "./FormContext";
import { FormData } from "./FormData";
import { FormImages } from "./FormImages";

interface SearchFormProps {
  categories: Category[];
}

export function ProductForm({ categories }: SearchFormProps) {
  const [open, setOpen] = useState(false);
  const {
    currentStatus: { page, slugId },
    handleChangeStatus,
  } = useProductFormContext();

  useEffect(() => {
    if (page) {
      setOpen(true);
    }
  }, [page]);

  return (
    <Dialog
      open={open}
      onOpenChange={(oldValue) => {
        if (!oldValue) {
          handleChangeStatus({ page: null, slugId: "" });
        }
        setOpen(oldValue);
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => handleChangeStatus({ page: "CREATE", slugId: "" })}
      >
        <Button>Novo produto</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <Tabs defaultValue="account">
          <DialogHeader>
            <DialogTitle>
              {page === "CREATE" ? "Novo" : "Editar"} Produto
            </DialogTitle>
            <DialogDescription>
              Digite os dados necessário para{" "}
              {page === "CREATE" ? "criar um" : "alterar o"} produto
            </DialogDescription>
          </DialogHeader>
          <TabsList className="mt-4 w-full">
            <TabsTrigger value="data" className="flex-1">
              Dados
            </TabsTrigger>
            <TabsTrigger
              disabled={page === "CREATE" && !slugId}
              value="images"
              className="flex-1"
            >
              Imagens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data">
            <FormData
              openDialog={() => setOpen(true)}
              categories={categories}
            />
          </TabsContent>

          <TabsContent value="images">
            <FormImages />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
