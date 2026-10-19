const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Parses "YYYY" or "YYYY-MM" into year and optional zero-based month. */
export function parsePartial(value: string) {
  const [year, month] = value.split('-').map(Number);
  return { year, month: month ? month - 1 : undefined };
}

/** "2022-08" -> "Aug 2022", "2026" -> "2026". */
export function formatPartial(value: string) {
  const { year, month } = parsePartial(value);
  return month === undefined ? String(year) : `${MONTHS[month]} ${year}`;
}

export function formatRange(start: string, end: string | null, presentLabel: string) {
  return `${formatPartial(start)} – ${end ? formatPartial(end) : presentLabel}`;
}

export function yearsSince(start: string, now = new Date()) {
  const { year, month = 0 } = parsePartial(start);
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() - month);
  return Math.max(0, Math.floor(months / 12));
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** Sort key so entries without an end date ("Present") come first. */
export const sortKey = (value: string | null) => (value === null ? '9999-12' : value.padEnd(7, '-12'));
