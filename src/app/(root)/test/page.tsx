"use client";

import { toast } from "sonner";

export default function PageTest() {
  return (
    <div>
      <button
        onClick={() => {
          toast("Produto criado com sucesso! 2");
        }}
      >
        teste
      </button>
    </div>
  );
}
