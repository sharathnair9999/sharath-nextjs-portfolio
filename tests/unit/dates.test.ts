import { describe, expect, it } from 'vitest';
import { formatDate, formatPartial, formatRange, sortKey, yearsSince } from '../../src/lib/dates';

describe('dates', () => {
  it('formats partial dates', () => {
    expect(formatPartial('2022-08')).toBe('Aug 2022');
    expect(formatPartial('2026')).toBe('2026');
  });

  it('formats ranges with an open end', () => {
    expect(formatRange('2022-08', null, 'Present')).toBe('Aug 2022 – Present');
    expect(formatRange('2024-01', '2026', 'Present')).toBe('Jan 2024 – 2026');
  });

  it('counts whole years since a start month', () => {
    expect(yearsSince('2021-06', new Date(2026, 4, 31))).toBe(4);
    expect(yearsSince('2021-06', new Date(2026, 5, 1))).toBe(5);
    expect(yearsSince('2021-06', new Date(2020, 0, 1))).toBe(0);
  });

  it('formats ISO dates', () => {
    expect(formatDate('2022-06-09')).toBe('Jun 9, 2022');
  });

  it('sorts open-ended entries first', () => {
    expect(sortKey(null) > sortKey('2026-12')).toBe(true);
    expect(sortKey('2026') > sortKey('2026-01')).toBe(true);
  });
});
