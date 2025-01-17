import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-h-vh flex min-h-svh w-screen flex-col items-center justify-center gap-4 overflow-x-hidden bg-zinc-50 px-4">
      <Image
        priority
        className="size-10"
        src="/logo.svg"
        alt="Logo"
        width={400}
        height={400}
      />
      {children}
    </div>
  );
}
