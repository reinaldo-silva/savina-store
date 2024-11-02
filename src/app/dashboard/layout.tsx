import { FooterNavigation } from "@/components/FooterNavigation";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-h-vh flex min-h-screen w-screen flex-col overflow-x-hidden bg-zinc-50 pb-[60px] pt-[104px] md:pb-0">
      <div className="fixed left-0 top-0 z-40 max-h-[104px] w-screen">
        <div className="flex justify-center bg-zinc-950 py-2 text-xs font-bold uppercase text-white">
          Dashboard Administrativa
        </div>
        <div className="border-b bg-white shadow-sm">
          <header className="mx-auto flex max-h-[72px] w-full max-w-screen-xl items-center justify-between space-x-4 p-4">
            <Link href="/" className="w-[88px]">
              <Image
                className="size-10 min-w-10"
                src="/logo.svg"
                alt="Logo"
                width={400}
                height={400}
              />
            </Link>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="size-10 rounded-full border-2 bg-zinc-100 shadow"
              >
                <User size={24} />
              </Button>
            </div>
          </header>
        </div>
      </div>
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-1 border-x border-zinc-200 bg-white shadow-sm">
        {children}
      </div>
      <FooterNavigation />
    </div>
  );
}
