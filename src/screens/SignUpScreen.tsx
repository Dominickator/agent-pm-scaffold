import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'pocketbills_account';

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid email');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Password must be at least 8 characters');
      return;
    }

    const account = {email, password};
    try {
      if (SecureStore.isAvailableAsync) {
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(account));
      } else {
        // Fallback to AsyncStorage if SecureStore not available
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(account));
      }
      Alert.alert('Account saved');
    } catch (e) {
      Alert.alert('Failed to save account');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={onSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, justifyContent: 'center'},
  title: {fontSize: 24, marginBottom: 12, textAlign: 'center'},
  input: {borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4},
});

export default SignUpScreen;
