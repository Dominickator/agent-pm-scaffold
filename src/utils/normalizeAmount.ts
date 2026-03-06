export type Frequency = 'monthly' | 'annual' | 'weekly';

export function normalizeToMonthly(amount: number, frequency: Frequency): number {
  if (!isFinite(amount) || amount < 0) throw new Error('Invalid amount');
  switch (frequency) {
    case 'monthly':
      return amount;
    case 'annual':
      return amount / 12;
    case 'weekly':
      return amount * 52 / 12; // approximate monthly from weekly
    default:
      throw new Error('Unknown frequency');
  }
}
