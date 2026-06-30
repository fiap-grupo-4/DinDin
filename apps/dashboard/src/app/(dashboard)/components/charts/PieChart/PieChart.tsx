'use client';

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PieChartDataItem } from '@/src/types/charts.types';
import { maskUtils } from '@/src/lib/utils';
import { CHART_COLORS, CHART_HEADING_CLASS, CHART_LEGEND_PROPS } from '../constants';

interface PieChartProps {
  data: PieChartDataItem[];
  title?: string;
  heading?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: PieChartDataItem;
  }>;
  total?: number;
}

function ChartTooltip({ active, payload, total = 0 }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const percent =
    total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';

  return (
    <div
      className="rounded-md border px-3 py-2 text-body-sm shadow-sm"
      style={{
        backgroundColor: CHART_COLORS.tooltipBg,
        borderColor: CHART_COLORS.tooltipBorder,
      }}
    >
      <p className="font-medium text-gray-800">{item.name}</p>
      <p style={{ color: item.payload.color }}>
        {maskUtils.getCurrencyMask(item.value)} ({percent}%)
      </p>
    </div>
  );
}

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

function renderPieLabel({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
}: PieLabelProps) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-body-sm font-medium"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
}

export default function PieChart({
  data,
  title = 'Distribuição financeira',
  heading,
}: PieChartProps) {
  if (data.length === 0) {
    return (
      <p className="text-center text-body-sm text-gray-600 py-8">
        Sem dados suficientes para exibir o gráfico.
      </p>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <figure
      className="w-full"
      aria-label={title}
      role="img"
    >
      {heading ? (
        <figcaption className={CHART_HEADING_CLASS.pie}>{heading}</figcaption>
      ) : null}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            label={renderPieLabel}
            labelLine={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip total={total} />} />
          <Legend
            {...CHART_LEGEND_PROPS}
            formatter={(value: string) => {
              const item = data.find((entry) => entry.name === value);
              const percent =
                item && total > 0
                  ? ((item.value / total) * 100).toFixed(1)
                  : '0';

              return (
                <span className="text-body-sm text-gray-700">
                  {value} ({percent}%)
                </span>
              );
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </figure>
  );
}
