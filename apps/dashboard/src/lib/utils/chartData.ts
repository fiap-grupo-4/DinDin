import { Transaction } from '@/src/types/transactions.types';
import {
  BarChartDataItem,
  FinancialChartData,
  PieChartDataItem,
} from '@/src/types/charts.types';
import { CHART_COLORS } from '@/src/app/(dashboard)/components/charts/constants';

const monthFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  year: '2-digit',
});

function getMonthlyTotals(
  transactions: Transaction[]
): BarChartDataItem[] {
  const monthlyMap = new Map<string, BarChartDataItem>();

  for (const transaction of transactions) {
    const date = new Date(transaction.createdAt);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthLabel = monthFormatter.format(date);

    const current = monthlyMap.get(monthKey) ?? {
      month: monthLabel,
      receitas: 0,
      despesas: 0,
    };

    if (transaction.transactionType === 'income') {
      current.receitas += transaction.value;
    } else {
      current.despesas += transaction.value;
    }

    monthlyMap.set(monthKey, current);
  }

  return Array.from(monthlyMap.entries())
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([, data]) => data);
}

function getDistributionData(
  totalIncomes: number,
  totalExpenses: number
): PieChartDataItem[] {
  const pieData: PieChartDataItem[] = [];

  if (totalIncomes > 0) {
    pieData.push({
      name: 'Receitas',
      value: totalIncomes,
      color: CHART_COLORS.income,
    });
  }

  if (totalExpenses > 0) {
    pieData.push({
      name: 'Despesas',
      value: totalExpenses,
      color: CHART_COLORS.expense,
    });
  }

  return pieData;
}

export function buildFinancialChartData(
  transactions: Transaction[],
  totalIncomes: number,
  totalExpenses: number
): FinancialChartData {
  return {
    pieData: getDistributionData(totalIncomes, totalExpenses),
    barData: getMonthlyTotals(transactions),
  };
}
