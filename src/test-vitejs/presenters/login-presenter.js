import Authenticator from '../authenticator.js';

export default class LoginPresenter {
  static BAD_SIGN_IN_MSG = 'Wrong email or password';
  static BAD_EMAIL_FORMAT_MSG = 'Email should be correct format';
  static BAD_PASSWORD_FORMAT_MSG = `Password should be 8 characters or longer`;
  static AUTH_ERROR_MSG_MAP = {
    [null]: '',
    [Authenticator.EMAIL_FORMAT_ERROR]: LoginPresenter.BAD_EMAIL_FORMAT_MSG,
    [Authenticator.PASSWORD_FORMAT_ERROR]: LoginPresenter.BAD_PASSWORD_FORMAT_MSG,
    [Authenticator.BAD_CREDENTIALS_ERROR]: LoginPresenter.BAD_SIGN_IN_MSG
  };

  viewModel = {
    emailError: '',
    passwordError: '',
    isEmailInputStatePrimary: true,
    isEmailInputStateError: false,
    isPasswordInputStatePrimary: true,
    isPasswordInputStateError: false,
    signInButtonLoading: false,
    emailInputDisabled: false,
    passwordInputDisabled: false,
    createAccountLinkDisabled: false
  };

  #email = '';
  #password = '';
  #emailTouched = false;
  #passwordTouched = false;

  #authenticator = null;
  #navigator = null;

  constructor(authenticator, navigator) {
    this.#authenticator = authenticator;
    this.#navigator = navigator;
  }

  onEmailChange(value) {
    this.#email = value;
    this.#validateEmail();
  }

  onPasswordChange(value) {
    this.#password = value;
    this.#validatePassword();
  }

  onEmailFocusOut() {
    this.#emailTouched = true;
    this.#validateEmail();
  }

  onPasswordFocusOut() {
    this.#passwordTouched = true;
    this.#validatePassword();
  }

  async onSignInClick() {
    this.#signInFormDisabled = true;
    this.#emailError = null;
    this.#passwordError = null;

    this.#emailTouched = true;
    this.#passwordTouched = true;

    await this.#authenticator.signIn(this.#email, this.#password);
    // await new Promise(r => setTimeout(r, 5000));

    if (this.#authenticator.isSignedIn) {
      this.#navigator.goToAbout();
    } else {
      this.#emailError = this.#authenticator.emailError;
      this.#passwordError = this.#authenticator.passwordError;
    }

    this.#signInFormDisabled = false;
  }

  set #signInFormDisabled(value) {
    this.viewModel.emailInputDisabled = value;
    this.viewModel.passwordInputDisabled = value;
    this.viewModel.signInButtonLoading = value;
    this.viewModel.createAccountLinkDisabled = value;
  }

  set #emailError(value) {
    this.viewModel.emailError = LoginPresenter.AUTH_ERROR_MSG_MAP[value];
    this.viewModel.isEmailInputStatePrimary = value === null;
    this.viewModel.isEmailInputStateError = value !== null;
  }

  set #passwordError(value) {
    this.viewModel.passwordError = LoginPresenter.AUTH_ERROR_MSG_MAP[value];
    this.viewModel.isPasswordInputStatePrimary = value === null;
    this.viewModel.isPasswordInputStateError = value !== null;
  }

  #validateEmail() {
    if (!this.#emailTouched)
      return;

    this.#authenticator.validateEmail(this.#email);
    this.#emailError = this.#authenticator.emailError;
  }

  #validatePassword() {
    if (!this.#passwordTouched)
      return;

    this.#authenticator.validatePassword(this.#password);
    this.#passwordError = this.#authenticator.passwordError;
  }
}