"use client";
import { Switch } from "@/components/ui/switch";
import { useLoading } from "@/hook/useLoading";
import { switchAvailable } from "@/services/productService";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { toast } from "sonner";

export function SwitchAvailableButton({
  checked,
  slug,
}: {
  checked: boolean;
  slug: string;
}) {
  const cookies = parseCookies();
  const token = cookies["APP_SAVINA:token"];
  const { refresh } = useRouter();
  const { isLoading, start, stop } = useLoading();

  async function handleClick() {
    start();
    await switchAvailable(slug, token);

    await fetch("/api/revalidate/products", { method: "GET" }).then(() => {
      toast(`Visibilidade alterada com sucesso!`);
      refresh();
    });
    stop();
  }

  return (
    <Switch disabled={isLoading} onClick={handleClick} checked={checked} />
  );
}
