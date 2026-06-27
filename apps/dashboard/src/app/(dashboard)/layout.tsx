import { StoreProvider } from '@/src/store';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <StoreProvider>{children}</StoreProvider>;
}
