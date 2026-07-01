'use client';

import { FinancialChartData } from '@/src/types/charts.types';
import { PieChart } from '../PieChart';
import { LineChart } from '../LineChart';

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
      <LineChart
        data={chartData.lineData}
        heading="Evolução do saldo mensal"
        title="Saldo mensal ao longo do tempo"
      />
    </div>
  );
}
