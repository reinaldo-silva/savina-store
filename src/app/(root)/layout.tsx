import { Footer } from "@/components/Footer";
import { FooterNavigation } from "@/components/FooterNavigation";
import { Header } from "@/components/Header";
import { getCategories } from "@/services/categoriesService";
import { use } from "react";
import { RootContextProvider } from "./RootContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCategories = use(getCategories());

  return (
    <RootContextProvider>
      <div className="max-h-vh flex min-h-screen w-screen flex-col overflow-x-hidden bg-zinc-50 pb-[60px] pt-[104px] md:pb-0 md:pt-[133px]">
        <Header categories={(allCategories.data ?? []).slice(0, 4)} />

        <div className="mx-auto flex h-full w-full max-w-screen-lg flex-1 border-x border-zinc-200 bg-white shadow-sm">
          {children}
        </div>
        <Footer categories={allCategories.data ?? []} />
        <FooterNavigation />
      </div>
    </RootContextProvider>
  );
}
