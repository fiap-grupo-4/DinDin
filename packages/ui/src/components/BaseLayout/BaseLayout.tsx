import { Footer } from "../Footer";
import { Header } from "../Header";

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function BaseLayout({ children, className = "" }: BaseLayoutProps) {
  return (
    <html
      lang="pt-BR"
      className={`${className} h-full antialiased flex flex-col`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 items-center flex flex-col lg:grid lg:grid-cols-10 gap-3 px-6 w-full max-w-360 mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
