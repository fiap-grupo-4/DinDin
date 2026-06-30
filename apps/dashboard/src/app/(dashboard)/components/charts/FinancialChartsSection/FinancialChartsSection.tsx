'use client';

import dynamic from 'next/dynamic';
import { BarChartDataItem, PieChartDataItem } from '@/src/types/charts.types';

const PieChart = dynamic(
  () => import('../PieChart').then((mod) => mod.PieChart),
  {
    loading: () => (
      <div className="h-[300px] rounded-md bg-gray-200 animate-pulse" />
    ),
    ssr: false,
  }
);

const BarChart = dynamic(
  () => import('../BarChart').then((mod) => mod.BarChart),
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

interface FinancialBarChartProps {
  data: BarChartDataItem[];
}

export function FinancialPieChart({ data }: FinancialPieChartProps) {
  return (
    <PieChart
      data={data}
      heading="Distribuição Receitas x Despesas"
      title="Distribuição entre receitas e despesas"
    />
  );
}

export function FinancialBarChart({ data }: FinancialBarChartProps) {
  return (
    <BarChart
      data={data}
      heading="Evolução Mensal"
      title="Receitas e despesas por mês"
    />
  );
}
