const createRange = (start: number, end: number): number[] =>
  start > end
    ? []
    : Array.from({ length: end - start + 1 }, (_, i) => start + i);

const getStartBlock = (
  maxVisiblePages: number,
  totalPages: number
): (number | string)[] => {
  const endPage = Math.min(maxVisiblePages, totalPages - 1);
  return totalPages > maxVisiblePages
    ? [...createRange(1, endPage), '..._end', totalPages]
    : createRange(1, totalPages);
};

const getEndBlock = (
  maxVisiblePages: number,
  totalPages: number
): (number | string)[] => {
  const startPage = totalPages - maxVisiblePages + 1;
  return [1, '..._start', ...createRange(startPage, totalPages)];
};

const getMiddleBlock = (
  maxVisiblePages: number,
  totalPages: number,
  currentPage: number
): (number | string)[] => {
  const middleRange = createRange(
    currentPage,
    currentPage + maxVisiblePages - 1
  );
  const lastGenerated = middleRange[middleRange.length - 1];
  const hasRightEllipsis = lastGenerated < totalPages - 1;

  return [
    1,
    '..._start',
    ...middleRange,
    ...(hasRightEllipsis ? ['..._end'] : []),
    totalPages,
  ];
};

export const renderPaginationNumbers = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const maxVisiblePages = 3;

  const isNearStart = currentPage <= 3;
  const isNearEnd = currentPage > totalPages - maxVisiblePages;

  if (totalPages <= 1) return [];
  if (isNearStart) return getStartBlock(maxVisiblePages, totalPages);
  if (isNearEnd) return getEndBlock(maxVisiblePages, totalPages);

  return getMiddleBlock(maxVisiblePages, totalPages, currentPage);
};
