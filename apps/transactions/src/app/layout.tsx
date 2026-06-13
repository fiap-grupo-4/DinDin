import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Header, Footer } from "@dindin/ui";
import "@dindin/ui/styles/index.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Transações | DinDin",
  description: "App dedicado ao módulo de transações do DinDin",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${lato.variable} h-full antialiased flex flex-col`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-white">
        <Header />
        <main className="flex-1 items-center flex flex-col lg:grid lg:grid-cols-10 gap-3 px-6 w-full max-w-360 mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
