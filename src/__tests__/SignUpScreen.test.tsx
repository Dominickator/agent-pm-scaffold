import React from 'react';
import {render} from '@testing-library/react-native';
import SignUpScreen from '../screens/SignUpScreen';

test('renders', () => {
  const {getByPlaceholderText, getByText} = render(<SignUpScreen />);
  expect(getByPlaceholderText('Email')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
  expect(getByText('Sign Up')).toBeTruthy();
});
