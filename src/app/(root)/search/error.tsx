"use client";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <Image
        alt="Logo"
        src="/logo.svg"
        height={400}
        width={400}
        className="size-10"
      />
      <Heading as="h3">Ocorreu um erro inesperado!</Heading>
      <Button onClick={() => reset()}>Tente novamente</Button>
    </div>
  );
}
