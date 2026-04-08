/**
 * Returns the number of days in a given month.
 * @param {Date} date - Any date within the target month
 */
export function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Returns the weekday index (0=Sun … 6=Sat) of the first day of the month.
 * @param {Date} date
 */
export function getFirstDayOfWeek(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

/**
 * Returns the full month name in uppercase (e.g. "JANUARY").
 * @param {Date} date
 */
export function getMonthName(date) {
  return date.toLocaleString('default', { month: 'long' }).toUpperCase();
}

/**
 * Returns the 4-digit year.
 * @param {Date} date
 */
export function getYear(date) {
  return date.getFullYear();
}

/**
 * Returns an array of trailing day numbers from the previous month
 * to fill the first row of the calendar grid.
 * @param {Date} date - The current displayed month
 */
export function getPrevMonthTrailingDays(date) {
  const firstWeekday = getFirstDayOfWeek(date);
  if (firstWeekday === 0) return [];
  const prevMonthDays = getDaysInMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  return Array.from({ length: firstWeekday }, (_, i) => prevMonthDays - firstWeekday + i + 1);
}

/**
 * Returns a new Date advanced by `delta` months.
 * @param {Date} date
 * @param {number} delta - positive = forward, negative = back
 */
export function shiftMonth(date, delta) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

/**
 * Returns a Date set to the first day of the current calendar month.
 */
export function currentMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}
