import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "900", "800", "700", "600", "500", "300", "200", "100"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["1000", "900", "800", "700", "600", "500", "400", "300", "200"],
});

export const metadata: Metadata = {
  title: "Savina acessórios",
  description:
    "Descubra a elegância e o estilo com a Savina Acessórios. Explore nossa coleção exclusiva de acessórios que realçam sua beleza e complementam seu estilo pessoal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${poppins.variable} ${nunito.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
