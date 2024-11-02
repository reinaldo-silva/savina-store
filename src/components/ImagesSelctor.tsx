"use client";
import clsx from "clsx";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "./ui/label";

const maxFiles = 5;

interface ImagesSelectorProps {
  onChange: (files: File[]) => void;
  defaultValues?: File[];
}

export function ImageSelector({
  onChange,
  defaultValues = [],
}: ImagesSelectorProps) {
  const [files, setFiles] = useState<File[]>(defaultValues);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles,
    disabled: files.length >= maxFiles,
  });

  function removeImage(index: number) {
    const newImages = files.filter((_, i) => i !== index);
    setFiles(newImages);
  }

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  return (
    <div className="flex flex-col space-y-2">
      <Label>Imagens</Label>
      <div className="dropzone-container">
        <div
          {...getRootProps()}
          className={`dropzone border-2 border-dashed p-4 text-center ${
            isDragActive ? "bg-gray-200" : "bg-white"
          }`}
        >
          <input {...getInputProps()} />
          <p className={clsx({ "text-red-500": files.length >= maxFiles })}>
            {files.length < maxFiles
              ? "Arraste ou clique para adicionar imagens"
              : "Você atingiu o limite de 5 imagens"}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-2">
          {files.map((image, index) => (
            <div key={index} className="relative h-20 w-full">
              <Image
                width={200}
                height={200}
                src={URL.createObjectURL(image)}
                alt={`Imagem ${index + 1}`}
                className="h-full w-full rounded object-cover"
              />
              <button
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
                onClick={() => removeImage(index)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
