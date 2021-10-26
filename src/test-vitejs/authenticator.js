export default class Authenticator {
  static #EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  static #PASSWORD_REGEX = /^.{8,100}$/;

  static EMAIL_FORMAT_ERROR = 'EMAIL_FORMAT_ERROR';
  static PASSWORD_FORMAT_ERROR = 'PASSWORD_FORMAT_ERROR';
  static BAD_CREDENTIALS_ERROR = 'BAD_CREDENTIALS_ERROR';

  #isSignedIn = false;
  #emailError = null;
  #passwordError = null;

  #authGateway;

  constructor(authGateway) {
    this.#authGateway = authGateway;
  }

  get isSignedIn() {
    return this.#isSignedIn;
  }

  get emailError() {
    return this.#emailError;
  }

  get passwordError() {
    return this.#passwordError;
  }

  validateEmail(value) {
    this.#emailError = Authenticator.#EMAIL_REGEX.test(value)
      ? null : Authenticator.EMAIL_FORMAT_ERROR;
  }

  validatePassword(value) {
    this.#passwordError = Authenticator.#PASSWORD_REGEX.test(value)
      ? null : Authenticator.PASSWORD_FORMAT_ERROR;
  }

  async signIn(email, password) {
    const response = await this.#authGateway.signIn(email, password);
    if (response.errors) {
      this.#emailError = response.errors.email;
      this.#passwordError = response.errors.password;
      return;
    }
    this.#isSignedIn = !!response.tokens;
  }
}