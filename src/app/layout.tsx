import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Header } from "@/src/components/ui/Header";
import { Footer } from "@/src/components/ui/Footer";
import "../styles/globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "DinDin",
  description: "DinDin é um aplicativo de gerenciamento de finanças pessoais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${lato.variable} h-full antialiased flex flex-col`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
