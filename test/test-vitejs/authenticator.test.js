import { deepStrictEqual, strictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import Authenticator from '../../src/test-vitejs/authenticator.js';
import AuthGatewaySpy from './test-doubles/auth-gateway-spy.js';

describe('Authenticator', () => {
  let authGatewaySpy;
  let authenticator;

  beforeEach(() => {
    authGatewaySpy = new AuthGatewaySpy();
    authenticator = new Authenticator(authGatewaySpy);
  });

  it(`Check initial state`, () => {
    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, null);
    strictEqual(authenticator.passwordError, null);
  });

  it(`Invalidate bad email format`, () => {
    authenticator.validateEmail('user@email');

    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, Authenticator.EMAIL_FORMAT_ERROR);
    strictEqual(authenticator.passwordError, null);
  });

  it(`Validate correct email format`, () => {
    authenticator.validateEmail('user@email.com');

    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, null);
    strictEqual(authenticator.passwordError, null);
  });

  it(`Invalidate bad password format`, () => {
    authenticator.validatePassword('1234567');

    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, null);
    strictEqual(authenticator.passwordError, 
      Authenticator.PASSWORD_FORMAT_ERROR);
  });

  it(`Validate correct password format`, () => {
    authenticator.validatePassword('12345678');

    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, null);
    strictEqual(authenticator.passwordError, null);
  });

  it(`Invalidate bad credentials on sign-in`, async () => {
    await authenticator.signIn(
      AuthGatewaySpy.WRONG_EMAIL,
      AuthGatewaySpy.WRONG_PASSWORD
    );

    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, Authenticator.BAD_CREDENTIALS_ERROR);
    strictEqual(authenticator.passwordError, 
      Authenticator.BAD_CREDENTIALS_ERROR);
    strictEqual(authGatewaySpy.email, AuthGatewaySpy.WRONG_EMAIL);
    strictEqual(authGatewaySpy.password, AuthGatewaySpy.WRONG_PASSWORD);
  });

  it(`Sign-in with good credentials`, async () => {
    await authenticator.signIn(
      AuthGatewaySpy.CORRECT_EMAIL,
      AuthGatewaySpy.CORRECT_PASSWORD
    );

    strictEqual(authenticator.isSignedIn, true);
    strictEqual(authenticator.emailError, null);
    strictEqual(authenticator.passwordError, null);
    strictEqual(authGatewaySpy.email, AuthGatewaySpy.CORRECT_EMAIL);
    strictEqual(authGatewaySpy.password, AuthGatewaySpy.CORRECT_PASSWORD);
  });
});