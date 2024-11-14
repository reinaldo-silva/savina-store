"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/services/categoriesService";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Text } from "./Text";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface CategorySelectorProps {
  categories: Category[];
  onChange: (categories: number[]) => void;
  defaultValues?: number[];
}

export function CategorySelector({
  categories,
  onChange,
  defaultValues = [],
}: CategorySelectorProps) {
  const [catSelected, setCatSelected] = useState<number[]>(defaultValues);
  const categoriesParams = useSearchParams().get("cat");
  const pathname = usePathname();

  const handleSelectCat = (id: number) => {
    setCatSelected((prevSelected) => {
      const newArray = prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id];

      onChange(newArray);

      return newArray;
    });
  };

  useEffect(() => {
    if (!categoriesParams && pathname === "/search") {
      setCatSelected([]);
    }
  }, [categoriesParams, pathname]);

  return (
    <div className="flex flex-col space-y-2">
      <Label>Categorias</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn("justify-between text-muted-foreground")}
          >
            Selecione as categorias
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Procurar categoria..." />
            <CommandList>
              <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    value={category.name}
                    key={category.id}
                    onSelect={() => handleSelectCat(category.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        catSelected.includes(category.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-1 border-2 border-dashed p-2">
        {catSelected.length > 0 ? (
          catSelected.map((catSel, index) => {
            const categoryFound = categories.find(
              (category) => category.id === catSel,
            );
            return (
              <Button
                key={index}
                variant="link"
                className="p-0 hover:no-underline"
                onClick={() => handleSelectCat(catSel)}
              >
                <Badge variant="default">{categoryFound?.name ?? ""}</Badge>
              </Button>
            );
          })
        ) : (
          <Text className="w-full text-center text-muted-foreground">
            Nenhuma categoria selecionada
          </Text>
        )}
      </div>
      {catSelected[0] ? (
        <Text size="xs" className="!mt-1 font-semibold text-muted-foreground">
          Clique para remover
        </Text>
      ) : null}
    </div>
  );
}
