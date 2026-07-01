'use client';

import dynamic from 'next/dynamic';
import { LineChartDataItem, PieChartDataItem } from '@/src/types/charts.types';

const PieChart = dynamic(
  () => import('../PieChart').then((mod) => mod.PieChart),
  {
    loading: () => (
      <div className="h-[300px] rounded-md bg-gray-200 animate-pulse" />
    ),
    ssr: false,
  }
);

const LineChart = dynamic(
  () => import('../LineChart').then((mod) => mod.LineChart),
  {
    loading: () => (
      <div className="h-[320px] rounded-md bg-gray-200 animate-pulse" />
    ),
    ssr: false,
  }
);

interface FinancialPieChartProps {
  data: PieChartDataItem[];
}

interface FinancialLineChartProps {
  data: LineChartDataItem[];
}

export function FinancialPieChart({ data }: FinancialPieChartProps) {
  return (
    <PieChart
      data={data}
      heading="Minhas econômias"
      title="Distribuição entre receitas e despesas"
    />
  );
}

export function FinancialLineChart({ data }: FinancialLineChartProps) {
  return (
    <LineChart
      data={data}
      heading="Evolução do saldo mensal"
      title="Saldo mensal ao longo do tempo"
    />
  );
}
