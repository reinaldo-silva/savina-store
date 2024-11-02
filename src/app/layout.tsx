import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Encode_Sans, Marcellus_SC } from "next/font/google";

const marcellus = Marcellus_SC({
  weight: ["400"],
  variable: "--font-marcellus",
  subsets: ["latin"],
  display: "swap",
});

const encodeSans = Encode_Sans({
  variable: "--font-encode-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${marcellus.variable} ${encodeSans.variable}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
