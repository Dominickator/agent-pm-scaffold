import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export type Subscription = {
  id: string;
  name: string;
  rawCost: number; // cost in cents (e.g., 999 = $9.99)
  interval: 'monthly' | 'yearly' | 'weekly' | 'daily';
};

export function normalizeMonthlyCost(sub: Subscription) {
  const cents = sub.rawCost;
  switch (sub.interval) {
    case 'monthly':
      return cents;
    case 'yearly':
      return Math.round(cents / 12);
    case 'weekly':
      return Math.round((cents * 52) / 12);
    case 'daily':
      return Math.round((cents * 365) / 12);
    default:
      return cents;
  }
}

type Props = {
  items: Subscription[];
};

export default function SubscriptionsList({ items }: Props) {
  const withMonthly = items.map((s) => ({ ...s, monthly: normalizeMonthlyCost(s) }));
  const sorted = withMonthly.sort((a, b) => b.monthly - a.monthly);

  return (
    <View style={styles.container}>
      <FlatList
        data={sorted}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.cost} testID={`raw-${item.id}`}>
              ${ (item.rawCost / 100).toFixed(2) }
            </Text>
            <Text style={styles.monthly} testID={`monthly-${item.id}`}>
              ${ (item.monthly / 100).toFixed(2) } /mo
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  name: { flex: 1 },
  cost: { width: 80, textAlign: 'right' },
  monthly: { width: 100, textAlign: 'right' }
});
