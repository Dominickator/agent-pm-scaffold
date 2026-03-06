import React, {useState} from 'react';
import {View, Text, TextInput, Button, Picker, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {normalizeToMonthly, Frequency} from '../utils/normalizeAmount';

export default function AddSubscription({onDone}: {onDone?: () => void}) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('monthly');

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    const n = Number(amount);
    if (isNaN(n) || n <= 0) return 'Amount must be a positive number';
    return null;
  };

  const save = async () => {
    const err = validate();
    if (err) {
      Alert.alert('Validation', err);
      return;
    }
    const n = Number(amount);
    const monthly = normalizeToMonthly(n, frequency);
    const item = {id: Date.now().toString(), name: name.trim(), amount: n, frequency, monthly};
    try {
      const raw = await AsyncStorage.getItem('subscriptions');
      const list = raw ? JSON.parse(raw) : [];
      list.push(item);
      await AsyncStorage.setItem('subscriptions', JSON.stringify(list));
      onDone && onDone();
    } catch (e) {
      Alert.alert('Save error', String(e));
    }
  };

  return (
    <View style={{padding: 16}}>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} placeholder="e.g. Netflix" />
      <Text>Amount</Text>
      <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="9.99" />
      <Text>Frequency</Text>
      {/* Picker from react-native is deprecated in some setups; keep simple */}
      <Picker selectedValue={frequency} onValueChange={(v)=>setFrequency(v as Frequency)}>
        <Picker.Item label="Monthly" value="monthly" />
        <Picker.Item label="Annual" value="annual" />
        <Picker.Item label="Weekly" value="weekly" />
      </Picker>
      <Button title="Save" onPress={save} />
    </View>
  );
}
