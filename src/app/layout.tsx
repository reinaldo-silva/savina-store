import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Encode_Sans, Schibsted_Grotesk } from "next/font/google";

const schibsted = Schibsted_Grotesk({
  weight: ["900", "800", "700", "600", "500"],
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const encodeSans = Encode_Sans({
  variable: "--font-encode-sans",
  subsets: ["latin"],
  display: "swap",
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
      <body
        className={`antialiased ${schibsted.variable} ${encodeSans.variable}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
