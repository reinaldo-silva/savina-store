interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

async function signUp({ email, name, password }: User): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    },
  );

  const createdAccountResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      `Falha na criação da conta: ${createdAccountResponse.message}`,
    );
  }

  return createdAccountResponse.data.email;
}

async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string; name: string }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  const session = await response.json();

  if (!response.ok) {
    throw new Error(`Falha ao fazer o login: ${session.message}`);
  }

  const { token, user } = session.data;

  return { token, name: user.name };
}

export { signUp, signIn };

export type { User };
