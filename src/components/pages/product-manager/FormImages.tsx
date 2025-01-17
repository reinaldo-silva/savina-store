"use client";
import { ImageSelector } from "@/components/ImagesSelector";
import { Text } from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLoading } from "@/hook/useLoading";
import { deleteImage } from "@/services/imageService";
import {
  getProductImagesBySlug,
  Image as ImageType,
  setProductCoverImage,
  uploadProductImages,
} from "@/services/productService";
import { formatDate } from "@/utils/formatDate";
import clsx from "clsx";
import { Trash2, Wallpaper } from "lucide-react";
import Image from "next/image";
import { parseCookies } from "nookies";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useProductFormContext } from "./FormContext";

export function FormImages() {
  const [images, setImages] = useState<(ImageType | File)[]>([]);
  const { isLoading, start, stop } = useLoading();
  const cookies = parseCookies();
  const token = cookies["APP_SAVINA:token"];

  const {
    currentStatus: { slugId },
  } = useProductFormContext();

  const getImages = useCallback(async () => {
    start();
    await getProductImagesBySlug({ slug: slugId, token })
      .then((response) => {
        if (response.data) setImages(response.data);
      })
      .finally(stop);
  }, [slugId, start, stop, token]);

  async function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    await getImages();
  }

  async function handleUploadImages(e: FormEvent) {
    e.preventDefault();
    start();
    await uploadProductImages(
      slugId,
      images.filter((e) => e instanceof File),
      token,
    ).finally(stop);

    await getImages();
  }

  useEffect(() => {
    if (slugId) {
      getImages();
    }
  }, [getImages, slugId]);

  return (
    <form onSubmit={handleUploadImages}>
      <ImageSelector
        disabled={images.length >= 5}
        maxFiles={5}
        onChange={(files) => {
          setImages((oldValue) => [...oldValue, ...files]);
        }}
      />

      <div className="mt-4 grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative flex w-full flex-col">
            <div className="flex h-6 items-center justify-between py-1">
              {!(image instanceof File) && (
                <button
                  onClick={async () => {
                    await setProductCoverImage(slugId, image.public_id, token);
                    await getImages();
                  }}
                  type="button"
                  className={clsx(
                    "flex items-center gap-1 hover:text-sky-500",
                    {
                      "text-sky-500": image.is_cover,
                    },
                  )}
                >
                  <Wallpaper size={16} />
                  <Text className="font-bold">cover</Text>
                </button>
              )}

              <DeleteImageDialog
                refresh={getImages}
                removeFile={() => removeImage(index)}
                publicId={image instanceof File ? null : image.public_id}
              />
            </div>
            <Image
              width={200}
              height={200}
              src={
                image instanceof File
                  ? URL.createObjectURL(image)
                  : image.image_url
              }
              alt={`Imagem ${index + 1}`}
              className="h-44 w-full rounded object-cover"
            />
            <div className="mt-2 flex w-full">
              {image instanceof File && <Badge>Nova imagem</Badge>}
              {!(image instanceof File) && (
                <Badge>{formatDate(image.created_at)}</Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-full row-start-6 mt-8 flex flex-wrap gap-2">
        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full sm:w-auto"
        >
          Salvar imagens
        </Button>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="w-full sm:w-auto"
            variant="destructive"
          >
            Cancelar
          </Button>
        </DialogTrigger>
      </div>
    </form>
  );
}

function DeleteImageDialog({
  publicId,
  removeFile,
  refresh,
}: {
  publicId: string | null;
  removeFile: () => void;
  refresh(): void;
}) {
  const cookies = parseCookies();
  const token = cookies["APP_SAVINA:token"];
  const { isLoading, start, stop } = useLoading();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hover:text-red-500">
        <Trash2 size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja mesmo excluir essa imagem?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. A imagem será excluída
            permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex gap-2">
          <Button onClick={() => setIsOpen(false)} type="button">
            Cancelar
          </Button>

          <Button
            isLoading={isLoading}
            onClick={async () => {
              if (publicId) {
                start();
                await deleteImage(publicId, token).finally(stop);
                refresh();
              } else removeFile();

              setIsOpen(false);
            }}
            type="button"
            variant="destructive"
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
