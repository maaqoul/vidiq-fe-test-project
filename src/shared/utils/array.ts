export const getSlicedArray = <T>(arr: T[] | [], start: number, end: number) => {
  if (!Array.isArray(arr)) return [];
  const isZero = start === 0;
  const fromStart = isZero ? 0 : (start - 1) * end;
  const toEnd = start > 1 ? start * end + 1 : end;
  return arr.slice(fromStart, toEnd);
};
