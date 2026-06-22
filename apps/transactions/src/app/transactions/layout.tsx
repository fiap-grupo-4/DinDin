import { TransactionActionsProvider } from '@/src/context';

interface TransactionsLayoutProps {
  children: React.ReactNode;
}

export default function TransactionsLayout({
  children,
}: TransactionsLayoutProps) {
  return <TransactionActionsProvider>{children}</TransactionActionsProvider>;
}
