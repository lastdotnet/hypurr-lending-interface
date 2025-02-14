import { format } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { formatDate } from './formatDate';

const EXAMPLE_DATE = 1685664000000; // June 2, 2023
const date = new Date(EXAMPLE_DATE);

describe('formatDate', () => {
  it('should format date in "simple" format', () => {
    const result = formatDate({
      date: EXAMPLE_DATE,
      format: 'simple',
    });
    const expected = format(date, 'MMMM do, yyyy');
    expect(result).toBe(expected);
  });

  it('should format date in "timestamp" format', () => {
    const result = formatDate({
      date: EXAMPLE_DATE,
      format: 'timestamp',
    });
    const expected = format(date, 'MMM-dd-yyyy hh:mm:ss a OOO');
    expect(result).toBe(expected);
  });

  it('should format date in "ISO" format', () => {
    const result = formatDate({
      date: EXAMPLE_DATE,
      format: 'ISO',
    });
    const expected = format(date, 'yyyy-MM-dd HH:mm');
    expect(result).toBe(expected);
  });

  it('should format date in default format', () => {
    const result = formatDate({
      date: EXAMPLE_DATE,
    });
    const expected = format(date, 'MMM-dd-yyyy hh:mm:ss a OOO');
    expect(result).toBe(expected);
  });
});
