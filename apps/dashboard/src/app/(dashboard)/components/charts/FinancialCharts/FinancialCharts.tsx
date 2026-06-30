'use client';

import { FinancialChartData } from '@/src/types/charts.types';
import { PieChart } from '../PieChart';
import { BarChart } from '../BarChart';

interface FinancialChartsProps {
  chartData: FinancialChartData;
}

export default function FinancialCharts({ chartData }: FinancialChartsProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <PieChart
        data={chartData.pieData}
        heading="Distribuição Receitas x Despesas"
        title="Distribuição entre receitas e despesas"
      />
      <BarChart
        data={chartData.barData}
        heading="Evolução Mensal"
        title="Receitas e despesas por mês"
      />
    </div>
  );
}
