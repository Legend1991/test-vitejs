export default class LoginPresenter {
  static MIN_PASSWORD_LENGTH = 8;
  static BAD_SIGN_IN_MSG = 'Wrong email or password';
  static BAD_EMAIL_FORMAT_MSG = 'Email should be correct format';
  static BAD_PASSWORD_LENGTH_MSG =
    `Password should be ${LoginPresenter.MIN_PASSWORD_LENGTH} characters or longer`;

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
  #emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

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
    this.#emailError = '';
    this.#passwordError = '';

    await this.#authenticator.signIn(this.#email, this.#password);
    // await new Promise(r => setTimeout(r, 5000));

    if (this.#authenticator.isSignedIn) {
      this.#navigator.goToAbout();
    } else {
      this.#emailError = LoginPresenter.BAD_SIGN_IN_MSG;
      this.#passwordError = LoginPresenter.BAD_SIGN_IN_MSG;
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
    this.viewModel.emailError = value;
    this.viewModel.isEmailInputStatePrimary = value === '';
    this.viewModel.isEmailInputStateError = value !== '';
  }

  set #passwordError(value) {
    this.viewModel.passwordError = value;
    this.viewModel.isPasswordInputStatePrimary = value === '';
    this.viewModel.isPasswordInputStateError = value !== '';
  }

  #validateEmail() {
    if (!this.#emailTouched)
      return;

    const isEmailValid = this.#emailRegex.test(this.#email);

    this.#emailError = isEmailValid
      ? '' : LoginPresenter.BAD_EMAIL_FORMAT_MSG;
  }

  #validatePassword() {
    if (!this.#passwordTouched)
      return;

    const isPasswordValid =
      this.#password.length >= LoginPresenter.MIN_PASSWORD_LENGTH;

    this.#passwordError = isPasswordValid
      ? '' : LoginPresenter.BAD_PASSWORD_LENGTH_MSG;
  }
}