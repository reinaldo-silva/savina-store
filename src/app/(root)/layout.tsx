import { FooterNavigation } from "@/components/FooterNavigation";
import { Header } from "@/components/Header";
import { getCategories } from "@/services/categoriesService";
import { Suspense, use } from "react";
import { RootContextProvider } from "./RootContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCategories = use(getCategories());

  return (
    <RootContextProvider>
      <div className="max-h-vh flex min-h-screen w-screen flex-col overflow-x-hidden bg-zinc-50 pb-[60px] pt-[133px] md:pb-0">
        <Suspense>
          <Header categories={allCategories.data.slice(0, 4)} />
        </Suspense>
        <div className="mx-auto flex h-full w-full max-w-screen-xl flex-1 border-x border-zinc-200 bg-white shadow-sm">
          {children}
        </div>
        <FooterNavigation />
      </div>
    </RootContextProvider>
  );
}
