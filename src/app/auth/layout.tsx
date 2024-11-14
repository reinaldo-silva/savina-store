import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-h-vh flex min-h-screen w-screen flex-col items-center justify-center gap-4 overflow-x-hidden bg-zinc-50">
      <Image
        priority
        className="size-20"
        src="/logo.svg"
        alt="Logo"
        width={400}
        height={400}
      />
      {children}
    </div>
  );
}
