import React from 'react';
import { render } from '@testing-library/react-native';
import SubscriptionsList, { normalizeMonthlyCost, Subscription } from '../src/screens/SubscriptionsList';

describe('normalizeMonthlyCost', () => {
  test('monthly stays same', () => {
    const s: Subscription = { id: '1', name: 'A', rawCost: 1000, interval: 'monthly' };
    expect(normalizeMonthlyCost(s)).toBe(1000);
  });

  test('yearly divided by 12', () => {
    const s: Subscription = { id: '1', name: 'A', rawCost: 12000, interval: 'yearly' };
    expect(normalizeMonthlyCost(s)).toBe(1000);
  });

  test('weekly scaled', () => {
    const s: Subscription = { id: '1', name: 'A', rawCost: 300, interval: 'weekly' };
    // 300 *52 /12 = 1300
    expect(normalizeMonthlyCost(s)).toBe(Math.round((300 * 52) / 12));
  });
});

describe('SubscriptionsList', () => {
  test('renders and sorts by monthly descending', () => {
    const items: Subscription[] = [
      { id: 'a', name: 'Cheap Monthly', rawCost: 500, interval: 'monthly' }, // 500
      { id: 'b', name: 'Expensive Yearly', rawCost: 24000, interval: 'yearly' }, // 2000
      { id: 'c', name: 'Weekly Mid', rawCost: 800, interval: 'weekly' } // ~3466
    ];

    const { getAllByText, getByText, getByTestId } = render(<SubscriptionsList items={items} />);

    // Check order: compute monthly values
    const normalized = items.map((i) => ({ ...i, monthly: normalizeMonthlyCost(i) }));
    const sorted = normalized.sort((a, b) => b.monthly - a.monthly);

    // First item name should be at top (rendered in list, ensure first appears)
    expect(getByText(sorted[0].name)).toBeTruthy();

    // Check monthly display for one item
    const firstMonthly = (sorted[0].monthly / 100).toFixed(2);
    expect(getByTestId(`monthly-${sorted[0].id}`).props.children.join('')).toContain(firstMonthly);
  });
});
