import { Transaction } from '@/src/types/transactions.types';
import {
  FinancialChartData,
  PieChartDataItem,
  LineChartDataItem,
} from '@/src/types/charts.types';
import { CHART_COLORS } from '@/src/lib/constants/charts';

const monthFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  year: '2-digit',
});

function getBalanceProgression(
  transactions: Transaction[]
): LineChartDataItem[] {
  const monthlyMap = new Map<string, LineChartDataItem>();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthLabel = monthFormatter.format(date);

    const current = monthlyMap.get(monthKey) ?? {
      month: monthLabel,
      balance: 0,
    };

    if (transaction.transactionType === 'income') {
      current.balance += transaction.value;
    } else {
      current.balance -= transaction.value;
    }

    monthlyMap.set(monthKey, current);
  });

  let runningBalance = 0;

  return Array.from(monthlyMap.entries())
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([, data]) => {
      runningBalance += data.balance;

      return {
        month: data.month,
        balance: runningBalance,
      };
    });
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
    lineData: getBalanceProgression(transactions),
  };
}
