'use client';

import { useState } from "react";
import { Header } from "../Header";
import { Navbar } from "../Navbar";

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function BaseLayout({ children, className = "" }: BaseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html
      lang="pt-BR"
      className={`${className} h-full antialiased flex flex-col`}
    >
      <body className="min-h-full flex flex-col">
        <Header onToggle={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 items-center flex flex-col lg:grid lg:grid-cols-10 gap-3 px-6 w-full max-w-360 mx-auto transition-margin duration-200 sm:pl-20">
          {sidebarOpen && <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>}
          {children}
        </main>
        <Navbar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />
      </body>
    </html>
  );
}
