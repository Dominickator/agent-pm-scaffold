import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

test('renders title', () => {
  const { getByText } = render(<App />);
  expect(getByText('Pocket Bills')).toBeTruthy();
});
