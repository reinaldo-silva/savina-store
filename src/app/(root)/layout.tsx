import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-zinc-50 pt-[104px]">
      <Header />
      <div className="mx-auto max-w-screen-xl border-x border-zinc-200 bg-white shadow-sm">
        {children}
      </div>
    </div>
  );
}
