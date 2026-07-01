export interface PieChartDataItem {
  name: string;
  value: number;
  color: string;
}

export interface LineChartDataItem {
  month: string;
  balance: number;
}

export interface FinancialChartData {
  pieData: PieChartDataItem[];
  lineData: LineChartDataItem[];
}
