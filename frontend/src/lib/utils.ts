/**
 * Create a ISO formatted DateTime string without milliseconds.
 * @param date A Date object
 */
export function dateToISOStringWithoutMs(date: Date): string {
  const isoString = date.toISOString();
  return `${isoString.slice(0, isoString.length - 5)}Z`;
}
