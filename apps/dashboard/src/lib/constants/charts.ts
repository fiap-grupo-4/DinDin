export const CHART_COLORS = {
  balance: '#009b70',
  income: '#16a34a',
  expense: '#ef2d57',
  grid: '#dedede',
  axis: '#676767',
  tooltipBg: '#ffffff',
  tooltipBorder: '#ededed',
} as const;

export const CHART_LEGEND_PROPS = {
  verticalAlign: 'bottom' as const,
  align: 'center' as const,
  iconType: 'square' as const,
};

export const CHART_HEADING_CLASS = {
  pie: 'text-heading-xs md:text-heading-sm text-gray-800 mb-4 text-center',
  bar: 'text-heading-xs md:text-heading-sm text-gray-800 mb-4 text-center md:text-left md:pl-12',
} as const;
