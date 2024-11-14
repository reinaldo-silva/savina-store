import { CardDefault } from "@/components/CardDefault";
import { Heading } from "@/components/Heading";
import { SignInForm } from "@/components/pages/auth/SignInForm";
import { Text } from "@/components/Text";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center">
      <CardDefault className="max-w-md text-center">
        <Heading as="h3">Login</Heading>
        <Text className="font-semibold text-muted-foreground" size="sm">
          Entre na sua conta para acessar nosso catálogo exclusivo de semijoias,
          acompanhar seus pedidos e aproveitar ofertas especiais personalizadas
          para você.
        </Text>
        <SignInForm />
      </CardDefault>
    </div>
  );
}
