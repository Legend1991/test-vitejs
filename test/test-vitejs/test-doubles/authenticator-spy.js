export default class AuthenticatorSpy {
  static WRONG_EMAIL = 'wrong.email@example.com';
  static WRONG_PASSWORD = 'wrongpassword';
  static CORRECT_EMAIL = 'correct.email@example.com';
  static CORRECT_PASSWORD = 'correctpassword';

  log = [];
  isSignedIn = false;

  async signIn(email, password) {
    queueMicrotask(() => {
      const args = JSON.stringify([email, password]);
      this.log.push(`[Authenticator # signIn] args: ${args}`);

      this.isSignedIn = email === AuthenticatorSpy.CORRECT_EMAIL
        && password === AuthenticatorSpy.CORRECT_PASSWORD;
    });
  }
}