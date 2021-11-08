import {strictEqual} from 'assert';
import {describe} from 'mocha';
import {given} from 'mocha-testdata';
import RouteAuthorizer, {
  AUTHENTICATION_PATHS,
  PROTECTED_PATHS,
  DEFAULT_AUTHENTICATION_PATH,
  DEFAULT_PUBLIC_PATH,
} from '../../src/test-vitejs/route-authorizer.js';
import AuthGatewaySpy from './test-doubles/auth-gateway-spy.js';

describe('RouteAuthorizer', () => {
  given(PROTECTED_PATHS).
      it(`Redirect a protected path to default authentication path ` +
          `when a user is not signed in`, (path) => {
        const authorizer = new RouteAuthorizer({accessToken: null});

        strictEqual(authorizer.route(path), DEFAULT_AUTHENTICATION_PATH);
      });

  given(AUTHENTICATION_PATHS).
      it(`Redirect an authentication path to default public path ` +
          `when a user is signed in`, (path) => {
        const authorizer = new RouteAuthorizer({
          accessToken: AuthGatewaySpy.ACCESS_TOKEN_STUB,
        });

        strictEqual(authorizer.route(path), DEFAULT_PUBLIC_PATH);
      });
});