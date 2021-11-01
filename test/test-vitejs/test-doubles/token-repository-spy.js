export default class TokenRepositorySpy {
  accessTokenValue = null;
  expiresInValue = null;
  refreshTokenValue = null;

  set accessToken(value) {
    this.accessTokenValue = value;
  }

  set refreshToken(value) {
    this.refreshTokenValue = value;
  }

  set expiresIn(value) {
    this.expiresInValue = value;
  }
}