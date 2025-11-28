// utils/formatDate.js

/**
 * Formats a UTC ISO date string into a user-friendly, locale-aware string.
 * This function will attempt to use 'Intl.RelativeTimeFormat' for "Today"/'Yesterday'
 * and fallback to a standard date/time format.
 *
 * @param {string} isoDateString - The UTC ISO date string (e.g., '2025-11-28T12:39:30.695Z').
 * @param {string} [locale='en-US'] - The locale to use for formatting.
 * @param {string} [timeZone] - The target time zone (e.g., 'America/Los_Angeles').
 * @returns {string} The formatted date string (e.g., 'Today, 3:45 PM' or 'Nov 28, 2025, 3:45 PM').
 */
export function formatRelativeDate(
  isoDateString:any,
  locale = 'en-US',
  timeZone = undefined // Uses the user's local time zone by default
) {
  const date = new Date(isoDateString);
  const now = new Date();

  // --- 1. Check for 'Today' / 'Yesterday' ---

  const startOfDay = (d:any) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(date)) / (1000 * 60 * 60 * 24)
  );

  let datePrefix = '';

  if (diffDays === 0) {
    datePrefix = 'Today';
  } else if (diffDays === 1) {
    datePrefix = 'Yesterday';
  }

  // --- 2. Format Time and Full Date ---

  const timeOptions:any = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timeZone,
  };

  const fullDateOptions:any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...timeOptions,
  };

  const timeFormatter = new Intl.DateTimeFormat(locale, timeOptions);
  const fullDateFormatter = new Intl.DateTimeFormat(locale, fullDateOptions);

  if (datePrefix) {
    // If 'Today' or 'Yesterday', append the formatted time.
    const timeString = timeFormatter.format(date);
    return `${datePrefix}, ${timeString}`;
  } else {
    // Otherwise, return the full formatted date.
    return fullDateFormatter.format(date);
  }
}