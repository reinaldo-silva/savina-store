import { CardDefault } from "@/components/CardDefault";
import { Heading } from "@/components/Heading";
import { SignUpForm } from "@/components/pages/auth/SignUpForm";
import { Text } from "@/components/Text";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center">
      <CardDefault className="max-w-md overflow-scroll text-center">
        <Heading as="h3">Nova conta</Heading>
        <Text className="font-semibold text-muted-foreground" size="sm">
          Crie sua conta para acessar nosso catálogo exclusivo de semijoias,
          acompanhar seus pedidos, salvar seus produtos favoritos e receber
          ofertas especiais. É rápido e fácil!
        </Text>
        <SignUpForm />
      </CardDefault>
    </div>
  );
}
