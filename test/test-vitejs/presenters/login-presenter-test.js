import { deepStrictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import LoginPresenter
  from '../../../src/test-vitejs/presenters/login-presenter.js';
import AuthGatewaySpy from '../test-doubles/auth-gateway-spy.js';
import AuthenticatorSpy from '../test-doubles/authenticator-spy.js';
import NavigatorSpy from '../test-doubles/navigator-spy.js';
import ViewModelSpy from '../test-doubles/view-model-spy.js';
import Utils from '../../utils.js';

describe('LoginPresenter', () => {
  const initialViewModel = {
    emailError: '',
    passwordError: '',
    isEmailInputStatePrimary: true,
    isEmailInputStateError: false,
    isPasswordInputStatePrimary: true,
    isPasswordInputStateError: false,
    signInButtonLoading: false,
    emailInputDisabled: false,
    passwordInputDisabled: false,
    createAccountLinkDisabled: false,
  };

  let authenticator;
  let navigator;
  let presenter;

  beforeEach(() => {
    authenticator = new AuthenticatorSpy();
    navigator = new NavigatorSpy();
    presenter = new LoginPresenter(authenticator, navigator);
  });

  it('Check initial state', () => {
    deepStrictEqual(presenter.viewModel, initialViewModel);
  });

  describe('Email Input', () => {
    it('Should not validate email until first focus out', () => {
      presenter.onEmailChange(Utils.makeChangeEvent('u'));

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });

    it('Invalidate empty email', () => {
      presenter.onEmailChange(Utils.makeChangeEvent(''));
      presenter.onEmailFocusOut();

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        emailError: LoginPresenter.BAD_EMAIL_FORMAT_MSG,
        isEmailInputStatePrimary: false,
        isEmailInputStateError: true,
      });
    });

    it('Invalidate wrong email', () => {
      presenter.onEmailChange(Utils.makeChangeEvent('user@email'));
      presenter.onEmailFocusOut();

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        emailError: LoginPresenter.BAD_EMAIL_FORMAT_MSG,
        isEmailInputStatePrimary: false,
        isEmailInputStateError: true,
      });
    });

    it('Validate correct email', () => {
      presenter.onEmailChange(Utils.makeChangeEvent('user@email.com'));
      presenter.onEmailFocusOut();

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });

    it('Validate email after change from wrong to correct format', () => {
      presenter.onEmailChange(Utils.makeChangeEvent('user@email'));
      presenter.onEmailFocusOut();

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        emailError: LoginPresenter.BAD_EMAIL_FORMAT_MSG,
        isEmailInputStatePrimary: false,
        isEmailInputStateError: true,
      });

      presenter.onEmailChange(Utils.makeChangeEvent('user@email.com'));

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });

    it('Validate email after sign-in click as it was focused out', async () => {
      presenter.onPasswordChange(
        Utils.makeChangeEvent(AuthGatewaySpy.CORRECT_PASSWORD),
      );
      presenter.onEmailChange(Utils.makeChangeEvent('user@email'));
      await presenter.onSignInClick();
      presenter.onEmailChange(Utils.makeChangeEvent('user@email.com'));

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });

    it('Invalidate email after sign-in click '
        + 'as it was focused out', async () => {
      presenter.onPasswordChange(
        Utils.makeChangeEvent(AuthGatewaySpy.CORRECT_PASSWORD),
      );
      presenter.onEmailChange(Utils.makeChangeEvent('u'));
      await presenter.onSignInClick();
      presenter.onEmailChange(Utils.makeChangeEvent('us'));

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        emailError: LoginPresenter.BAD_EMAIL_FORMAT_MSG,
        isEmailInputStatePrimary: false,
        isEmailInputStateError: true,
      });
    });
  });

  describe('Password Input', () => {
    it('Should not validate password until first focus out', () => {
      presenter.onPasswordChange(Utils.makeChangeEvent('1'));

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });

    it('Invalidate empty password', () => {
      presenter.onPasswordChange(Utils.makeChangeEvent(''));
      presenter.onPasswordFocusOut();

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        passwordError: LoginPresenter.BAD_PASSWORD_FORMAT_MSG,
        isPasswordInputStatePrimary: false,
        isPasswordInputStateError: true,
      });
    });

    it('Invalidate to short password length', () => {
      presenter.onPasswordChange(Utils.makeChangeEvent('1234567'));
      presenter.onPasswordFocusOut();

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        passwordError: LoginPresenter.BAD_PASSWORD_FORMAT_MSG,
        isPasswordInputStatePrimary: false,
        isPasswordInputStateError: true,
      });
    });

    it('Validate correct password length', () => {
      presenter.onPasswordChange(Utils.makeChangeEvent('12345678'));
      presenter.onPasswordFocusOut();

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });

    it('Validate password change from wrong to correct length', () => {
      presenter.onPasswordChange(Utils.makeChangeEvent('1234567'));
      presenter.onPasswordFocusOut();

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        passwordError: LoginPresenter.BAD_PASSWORD_FORMAT_MSG,
        isPasswordInputStatePrimary: false,
        isPasswordInputStateError: true,
      });

      presenter.onPasswordChange(Utils.makeChangeEvent('12345678'));

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });

    it('Validate password after sign-in click '
        + 'as it was focused out', async () => {
      presenter.onEmailChange(
        Utils.makeChangeEvent(AuthGatewaySpy.CORRECT_EMAIL),
      );
      presenter.onPasswordChange(Utils.makeChangeEvent('1234567'));
      await presenter.onSignInClick();
      presenter.onPasswordChange(Utils.makeChangeEvent('12345678'));

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });

    it('Invalidate password after sign-in click '
        + 'as it was focused out', async () => {
      presenter.onEmailChange(
        Utils.makeChangeEvent(AuthGatewaySpy.CORRECT_EMAIL),
      );
      presenter.onPasswordChange(Utils.makeChangeEvent('1'));
      await presenter.onSignInClick();
      presenter.onPasswordChange(Utils.makeChangeEvent('12'));

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        passwordError: LoginPresenter.BAD_PASSWORD_FORMAT_MSG,
        isPasswordInputStatePrimary: false,
        isPasswordInputStateError: true,
      });
    });
  });

  describe('Sign In', () => {
    const viewModelDisableSignInFormLog = [
      '[ViewModel # emailInputDisabled] set: true',
      '[ViewModel # passwordInputDisabled] set: true',
      '[ViewModel # signInButtonLoading] set: true',
      '[ViewModel # createAccountLinkDisabled] set: true',
    ];
    const viewModelClearEmailErrorLog = [
      '[ViewModel # emailError] set: ""',
      '[ViewModel # isEmailInputStatePrimary] set: true',
      '[ViewModel # isEmailInputStateError] set: false',
    ];
    const viewModelClearPasswordErrorLog = [
      '[ViewModel # passwordError] set: ""',
      '[ViewModel # isPasswordInputStatePrimary] set: true',
      '[ViewModel # isPasswordInputStateError] set: false',
    ];
    const viewModelEnableSignInFormLog = [
      '[ViewModel # emailInputDisabled] set: false',
      '[ViewModel # passwordInputDisabled] set: false',
      '[ViewModel # signInButtonLoading] set: false',
      '[ViewModel # createAccountLinkDisabled] set: false',
    ];

    let log;
    let viewModelSpy;

    beforeEach(() => {
      log = [];
      viewModelSpy = new ViewModelSpy(log);
      viewModelSpy.track(presenter);
      authenticator.log = log;
      navigator.log = log;
    });

    it('Disable form, clear errors, try to sign-in, '
        + 'show errors, enable form', async () => {
      presenter.onEmailChange(
        Utils.makeChangeEvent(AuthGatewaySpy.WRONG_EMAIL),
      );
      presenter.onPasswordChange(
        Utils.makeChangeEvent(AuthGatewaySpy.WRONG_PASSWORD),
      );

      log.length = 0;

      await presenter.onSignInClick();

      const signInArgs = JSON.stringify([
        AuthGatewaySpy.WRONG_EMAIL,
        AuthGatewaySpy.WRONG_PASSWORD,
      ]);

      deepStrictEqual(log, [
        ...viewModelDisableSignInFormLog,
        ...viewModelClearEmailErrorLog,
        ...viewModelClearPasswordErrorLog,
        `[Authenticator # signIn] args: ${signInArgs}`,
        '[ViewModel # emailError] set: "Wrong email or password"',
        '[ViewModel # isEmailInputStatePrimary] set: false',
        '[ViewModel # isEmailInputStateError] set: true',
        '[ViewModel # passwordError] set: "Wrong email or password"',
        '[ViewModel # isPasswordInputStatePrimary] set: false',
        '[ViewModel # isPasswordInputStateError] set: true',
        ...viewModelEnableSignInFormLog,
      ]);

      deepStrictEqual(presenter.viewModel, {
        ...initialViewModel,
        emailError: LoginPresenter.BAD_SIGN_IN_MSG,
        passwordError: LoginPresenter.BAD_SIGN_IN_MSG,
        isEmailInputStatePrimary: false,
        isEmailInputStateError: true,
        isPasswordInputStatePrimary: false,
        isPasswordInputStateError: true,
      });
    });

    it('Disable form, clear errors, sign-in, '
        + 'navigate to about, enable form', async () => {
      presenter.onEmailChange(
        Utils.makeChangeEvent(AuthGatewaySpy.CORRECT_EMAIL),
      );
      presenter.onPasswordChange(
        Utils.makeChangeEvent(AuthGatewaySpy.CORRECT_PASSWORD),
      );

      log.length = 0;

      await presenter.onSignInClick();

      const signInArgs = JSON.stringify([
        AuthGatewaySpy.CORRECT_EMAIL,
        AuthGatewaySpy.CORRECT_PASSWORD,
      ]);

      deepStrictEqual(log, [
        ...viewModelDisableSignInFormLog,
        ...viewModelClearEmailErrorLog,
        ...viewModelClearPasswordErrorLog,
        `[Authenticator # signIn] args: ${signInArgs}`,
        '[Navigator # goToAbout] args: []',
        ...viewModelEnableSignInFormLog,
      ]);

      deepStrictEqual(presenter.viewModel, initialViewModel);
    });
  });
});
