export function getFormattedDate(date: Date | string | undefined | null) {
  if (!date) return '';

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate.getTime())) return '';

  return parsedDate.toISOString().slice(0, 10);
}

export function getDateMinusDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
