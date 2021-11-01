const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const PASSWORD_REGEX = /^.{8,100}$/;

export default class Authenticator {
  static EMAIL_FORMAT_ERROR = 'EMAIL_FORMAT_ERROR';
  static PASSWORD_FORMAT_ERROR = 'PASSWORD_FORMAT_ERROR';
  static BAD_CREDENTIALS_ERROR = 'BAD_CREDENTIALS_ERROR';

  #isSignedIn = false;
  #emailError = null;
  #passwordError = null;

  #authGateway;
  #tokenRepository;

  constructor(authGateway, tokenRepository) {
    this.#authGateway = authGateway;
    this.#tokenRepository = tokenRepository;
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
    this.#emailError = EMAIL_REGEX.test(value)
      ? null : Authenticator.EMAIL_FORMAT_ERROR;
  }

  validatePassword(value) {
    this.#passwordError = PASSWORD_REGEX.test(value)
      ? null : Authenticator.PASSWORD_FORMAT_ERROR;
  }

  async signIn(email, password) {
    this.validateEmail(email);
    this.validatePassword(password);

    if (this.passwordError || this.emailError)
      return;

    const response = await this.#authGateway.signIn(email, password);

    if (response.error) {
      this.#emailError = response.error.type;
      this.#passwordError = response.error.type;
      return;
    }

    this.#isSignedIn = Boolean(response.result?.accessToken);
    this.#tokenRepository.accessToken = response.result?.accessToken;
    this.#tokenRepository.expiresIn = response.result?.expiresIn;
    this.#tokenRepository.refreshToken = response.result?.refreshToken;
  }
}