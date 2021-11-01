import { deepStrictEqual, strictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import Authenticator from '../../src/test-vitejs/authenticator.js';
import AuthGatewaySpy from './test-doubles/auth-gateway-spy.js';
import TokenRepositorySpy from "./test-doubles/token-repository-spy.js";

describe('Authenticator', () => {
  let authGatewaySpy;
  let tokenRepositorySpy;
  let authenticator;

  beforeEach(() => {
    authGatewaySpy = new AuthGatewaySpy();
    tokenRepositorySpy = new TokenRepositorySpy();
    authenticator = new Authenticator(authGatewaySpy, tokenRepositorySpy);
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

  it(`Invalidate bad password format on sign-in`, async () => {
    await authenticator.signIn(AuthGatewaySpy.CORRECT_EMAIL, '1234567');

    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, null);
    strictEqual(authenticator.passwordError,
      Authenticator.PASSWORD_FORMAT_ERROR);
  });

  it(`Invalidate bad email format on sign-in`, async () => {
    await authenticator.signIn('user@email', AuthGatewaySpy.CORRECT_PASSWORD);

    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, Authenticator.EMAIL_FORMAT_ERROR);
    strictEqual(authenticator.passwordError, null);
  });

  it(`Invalidate bad credentials format on sign-in`, async () => {
    await authenticator.signIn('user@email', '1234567');

    strictEqual(authenticator.isSignedIn, false);
    strictEqual(authenticator.emailError, Authenticator.EMAIL_FORMAT_ERROR);
    strictEqual(authenticator.passwordError,
      Authenticator.PASSWORD_FORMAT_ERROR);
  });

  it(`Reject sign-in with bad credentials`, async () => {
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
    strictEqual(tokenRepositorySpy.accessTokenValue, null);
    strictEqual(tokenRepositorySpy.expiresInValue, null);
    strictEqual(tokenRepositorySpy.refreshTokenValue, null);
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
    strictEqual(tokenRepositorySpy.accessTokenValue,
      AuthGatewaySpy.ACCESS_TOKEN_STUB);
    strictEqual(tokenRepositorySpy.expiresInValue,
        AuthGatewaySpy.EXPIRES_IN_STUB);
    strictEqual(tokenRepositorySpy.refreshTokenValue,
        AuthGatewaySpy.REFRESH_TOKEN_STUB);
  });
});