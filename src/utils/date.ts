/**
 * Date formatting utility functions
 */

/**
 * Format a date to a readable string
 * @param date - The date to format
 * @param locale - The locale to use (default: "en-GB")
 * @param options - Additional Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  locale: string = "en-GB",
  options?: Intl.DateTimeFormatOptions,
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
    date,
  );
}

/**
 * Format a date for long display (e.g., "January 15, 2025")
 */
export function formatDateLong(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
