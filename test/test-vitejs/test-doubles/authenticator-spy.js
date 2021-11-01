import Authenticator from '../../../src/test-vitejs/authenticator.js';
import AuthGatewaySpy from './auth-gateway-spy.js';
import TokenRepositorySpy from "./token-repository-spy.js";

export default class AuthenticatorSpy extends Authenticator {
  log = [];

  constructor() {
    super(new AuthGatewaySpy(), new TokenRepositorySpy());
  } 

  async signIn(email, password) {
    await super.signIn(email, password);
    const args = JSON.stringify([email, password]);
    this.log.push(`[Authenticator # signIn] args: ${args}`);
  }
}