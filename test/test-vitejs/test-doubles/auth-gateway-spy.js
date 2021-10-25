import Authenticator from '../../../src/test-vitejs/authenticator.js';

export default class AuthGatewaySpy {
  static WRONG_EMAIL = 'wrong.email@example.com';
  static WRONG_PASSWORD = 'wrongpassword';
  static CORRECT_EMAIL = 'correct.email@example.com';
  static CORRECT_PASSWORD = 'correctpassword';
  static TOKEN_STUB = 'token_sample';

  email;
  password;

  async signIn(email, password) {
    this.email = email;
    this.password = password;

    const isSignedIn = email === AuthGatewaySpy.CORRECT_EMAIL
      && password === AuthGatewaySpy.CORRECT_PASSWORD;

    if (isSignedIn)
      return {
        token: AuthGatewaySpy.TOKEN_STUB,
        emailError: null,
        passwordError: null
      };

    return {
      emailError: Authenticator.BAD_CREDENTIALS_ERROR,
      passwordError: Authenticator.BAD_CREDENTIALS_ERROR
    };
  }
}