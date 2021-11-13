const ACCESS_TOKEN_KEY = 'accessToken';
const EXPIRES_IN_KEY = 'expiresIn';
const REFRESH_TOKEN_KEY = 'refreshToken';

export default class LocalStorageTokenRepository {
  get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  set accessToken(value) {
    localStorage.setItem(ACCESS_TOKEN_KEY, value);
  }

  get expiresIn() {
    return localStorage.getItem(EXPIRES_IN_KEY);
  }

  set expiresIn(value) {
    localStorage.setItem(EXPIRES_IN_KEY, value);
  }

  get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  set refreshToken(value) {
    localStorage.setItem(REFRESH_TOKEN_KEY, value);
  }

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_IN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
