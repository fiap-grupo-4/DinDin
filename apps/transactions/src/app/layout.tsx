import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { BaseLayout } from '@dindin/ui';
import '@dindin/ui/styles/index.css';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Transações | DinDin',
  description: 'App dedicado ao módulo de transações do DinDin',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <BaseLayout className={lato.variable}>{children}</BaseLayout>;
}
