import Authenticator from '../../../src/test-vitejs/authenticator.js';

export default class AuthGatewaySpy {
  static WRONG_EMAIL = 'wrong.email@example.com';
  static WRONG_PASSWORD = 'wrongpassword';
  static CORRECT_EMAIL = 'correct.email@example.com';
  static CORRECT_PASSWORD = 'correctpassword';
  static ACCESS_TOKEN_STUB = 'access_token_stub';
  static REFRESH_TOKEN_STUB = 'refresh_token_stub';

  email;
  password;

  async signIn(email, password) {
    this.email = email;
    this.password = password;

    // await new Promise(r => setTimeout(r, 5000));

    const isSignedIn = email === AuthGatewaySpy.CORRECT_EMAIL
      && password === AuthGatewaySpy.CORRECT_PASSWORD;

    if (isSignedIn)
      return {
        tokens: {
          access: AuthGatewaySpy.ACCESS_TOKEN_STUB,
          refresh: AuthGatewaySpy.REFRESH_TOKEN_STUB
        },
        errors: null
      };

    return {
      tokens: null,
      errors: {
        email: Authenticator.BAD_CREDENTIALS_ERROR,
        password: Authenticator.BAD_CREDENTIALS_ERROR
      }
    };
  }
}