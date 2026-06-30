export interface PieChartDataItem {
  name: string;
  value: number;
  color: string;
}

export interface BarChartDataItem {
  month: string;
  receitas: number;
  despesas: number;
}

export interface FinancialChartData {
  pieData: PieChartDataItem[];
  barData: BarChartDataItem[];
}
