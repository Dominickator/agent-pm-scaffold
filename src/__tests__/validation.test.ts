import {validateEmail, validatePassword} from '../screens/SignUpScreen';

describe('validation', () => {
  test('valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('USER@domain.co')).toBe(true);
  });

  test('invalid emails', () => {
    expect(validateEmail('not-an-email')).toBe(false);
    expect(validateEmail('a@b')).toBe(false);
  });

  test('password length', () => {
    expect(validatePassword('12345678')).toBe(true);
    expect(validatePassword('short')).toBe(false);
  });
});
