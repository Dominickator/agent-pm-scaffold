import * as SecureStore from 'expo-secure-store';
const STORAGE_KEY = 'pocketbills_account';

export const saveAccount = async (account: {email: string; password: string}) => {
  try {
    if (SecureStore.isAvailableAsync) {
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(account));
      return true;
    }
  } catch (e) {
    // ignore and fallthrough
  }
  // fallback
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  return true;
};

export const loadAccount = async () => {
  try {
    if (SecureStore.isAvailableAsync) {
      const v = await SecureStore.getItemAsync(STORAGE_KEY);
      return v ? JSON.parse(v) : null;
    }
  } catch (e) {}
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  const v = await AsyncStorage.getItem(STORAGE_KEY);
  return v ? JSON.parse(v) : null;
};
