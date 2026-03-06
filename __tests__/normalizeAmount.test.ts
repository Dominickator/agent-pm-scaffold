import {normalizeToMonthly} from '../src/utils/normalizeAmount';

test('monthly unchanged', () => {
  expect(normalizeToMonthly(10, 'monthly')).toBe(10);
});

test('annual divides by 12', () => {
  expect(normalizeToMonthly(120, 'annual')).toBeCloseTo(10);
});

test('weekly converts approx', () => {
  expect(normalizeToMonthly(10, 'weekly')).toBeCloseTo(10 * 52 / 12);
});

test('invalid amount throws', () => {
  expect(() => normalizeToMonthly(-1, 'monthly')).toThrow();
});

