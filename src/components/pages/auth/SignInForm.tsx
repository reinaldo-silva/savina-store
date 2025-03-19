"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/hook/useLoading";
import { signIn } from "@/services/aurhService";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().min(1, { message: "O email é obrigatório" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
});

export function SignInForm() {
  const { push } = useRouter();

  const { isLoading, start, stop } = useLoading();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    start();
    try {
      const { name, token } = await signIn(data);

      Cookies.set("APP_SAVINA:token", token, {
        maxAge: 1 * (24 * 60 * 60),
        path: "/",
      });
      Cookies.set("APP_SAVINA:name", name, {
        maxAge: 1 * (24 * 60 * 60),
        path: "/",
      });

      toast(`Login realizado com sucesso!`);
      push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      } else {
        toast("Ocorreu um erro inesperado.");
      }
    }
    stop();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4 text-start"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="seunome@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Button isLoading={isLoading} type="submit">
            Entrar
          </Button>
          <Link href="/auth/sign-up" className="flex w-full">
            <Button variant="link" type="button" className="w-full">
              Criar uma conta
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
