/**
 * Safely convert date input (string, number, Date) to Date object
 * Handles both ISO strings and numeric timestamps
 */
export function toDate(value: string | number | Date | null | undefined): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string') {
    // Try ISO string first
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  if (typeof value === 'number') {
    // Handle both milliseconds and seconds
    const date = new Date(value > 10000000000 ? value : value * 1000);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}

/**
 * Safe date comparison
 */
export function compareDate(date1: any, date2: any): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);

  if (!d1 || !d2) return 0;
  return d1.getTime() - d2.getTime();
}

/**
 * Verify date is valid
 */
export function isValidDate(value: any): boolean {
  const date = toDate(value);
  return date !== null && !isNaN(date.getTime());
}
