"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type CurrentStatus = { page: null | "EDIT" | "CREATE"; slugId: string };

interface IProductFormContext {
  currentStatus: CurrentStatus;
  handleChangeStatus: (data: CurrentStatus) => void;
}

const ProductFormContext = createContext({} as IProductFormContext);

export function FormProductProvider({ children }: PropsWithChildren) {
  const [currentStatus, setCurrentStatus] = useState<CurrentStatus>({
    page: null,
    slugId: "",
  });

  function handleChangeStatus(data: CurrentStatus) {
    setCurrentStatus(data);
  }

  return (
    <ProductFormContext.Provider value={{ currentStatus, handleChangeStatus }}>
      {children}
    </ProductFormContext.Provider>
  );
}

export function useProductFormContext() {
  return useContext(ProductFormContext);
}

export function EditProductLink({ slugId }: { slugId: string }) {
  const { handleChangeStatus } = useProductFormContext();

  return (
    <Button
      onClick={() => {
        handleChangeStatus({ page: "EDIT", slugId });
      }}
      variant="ghost"
      className="flex size-8 items-center justify-center rounded hover:bg-zinc-200"
    >
      <Pencil size={20} />
    </Button>
  );
}
