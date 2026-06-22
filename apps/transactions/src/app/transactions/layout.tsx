import { StoreProvider } from '@/src/store';

interface TransactionsLayoutProps {
  children: React.ReactNode;
}

export default function TransactionsLayout({
  children,
}: TransactionsLayoutProps) {
  return <StoreProvider>{children}</StoreProvider>;
}
