import { SensitiveAmountProvider } from '@/src/context';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <SensitiveAmountProvider>{children}</SensitiveAmountProvider>;
}
