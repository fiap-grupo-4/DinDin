'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BarChartDataItem } from '@/src/types/charts.types';
import { maskUtils } from '@/src/lib/utils';
import { CHART_COLORS, CHART_HEADING_CLASS, CHART_LEGEND_PROPS } from '../constants';

interface BarChartProps {
  data: BarChartDataItem[];
  title?: string;
  heading?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

function ChartTooltip({ active, label, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-md border px-3 py-2 text-body-sm shadow-sm"
      style={{
        backgroundColor: CHART_COLORS.tooltipBg,
        borderColor: CHART_COLORS.tooltipBorder,
      }}
    >
      <p className="font-medium text-gray-800 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {maskUtils.getCurrencyMask(entry.value)}
        </p>
      ))}
    </div>
  );
}

function formatYAxis(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }

  return String(value);
}

export default function BarChart({
  data,
  title = 'Receitas e despesas por mês',
  heading,
}: BarChartProps) {
  if (data.length === 0) {
    return (
      <p className="text-center text-body-sm text-gray-600 py-8">
        Sem dados suficientes para exibir o gráfico.
      </p>
    );
  }

  return (
    <figure
      className="w-full"
      aria-label={title}
      role="img"
    >
      {heading ? (
        <figcaption className={CHART_HEADING_CLASS.bar}>{heading}</figcaption>
      ) : null}
      <ResponsiveContainer width="100%" height={320}>
        <RechartsBarChart
          data={data}
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            {...CHART_LEGEND_PROPS}
            formatter={(value: string) => (
              <span className="text-body-sm text-gray-700">{value}</span>
            )}
          />
          <Bar
            dataKey="receitas"
            name="Receitas"
            fill={CHART_COLORS.income}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
          />
          <Bar
            dataKey="despesas"
            name="Despesas"
            fill={CHART_COLORS.expense}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </figure>
  );
}
