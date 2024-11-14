"use client";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { Label } from "./ui/label";

interface ImagesSelectorProps {
  onChange: (files: File[]) => void;
  disabled: boolean;
  maxFiles?: number;
}

export function ImageSelector({
  onChange,
  disabled,
  maxFiles = 5,
}: ImagesSelectorProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, maxFiles);
    onChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles,
    disabled,
  });

  return (
    <div className="flex flex-col space-y-2">
      <Label>Imagens</Label>
      <div className="dropzone-container">
        <div
          {...getRootProps()}
          className={`dropzone border-2 border-dashed p-4 py-10 text-center ${
            isDragActive ? "bg-gray-200" : "bg-white"
          }`}
        >
          <input {...getInputProps()} />
          <p className={clsx({ "text-red-500": disabled })}>
            {!disabled
              ? "Arraste ou clique para adicionar imagens"
              : `Você atingiu o limite de ${maxFiles} imagens`}
          </p>
        </div>
      </div>
    </div>
  );
}
