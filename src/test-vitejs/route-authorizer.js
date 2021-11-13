export const AUTHENTICATION_PATHS = ['/login', '/register'];
export const PROTECTED_PATHS = ['/', '/about'];

export const DEFAULT_AUTHENTICATION_PATH = '/login';
export const DEFAULT_PUBLIC_PATH = '/about';

export default class RouteAuthorizer {
  #tokenRepository;

  constructor(tokenRepository) {
    this.#tokenRepository = tokenRepository;
  }

  route(path) {
    if (this.#shouldRedirectToAuthenticationPath(path)) {
      return DEFAULT_AUTHENTICATION_PATH;
    }

    if (this.#shouldRedirectToPublicPath(path)) return DEFAULT_PUBLIC_PATH;

    return path;
  }

  get #isSignedIn() {
    return Boolean(this.#tokenRepository.accessToken);
  }

  #shouldRedirectToAuthenticationPath(path) {
    return !this.#isSignedIn && this.#isProtectedPath(path);
  }

  #shouldRedirectToPublicPath(path) {
    return this.#isSignedIn && this.#isAuthenticationPath(path);
  }

  #isAuthenticationPath(path) {
    return AUTHENTICATION_PATHS.findIndex((e) => e === path) !== -1;
  }

  #isProtectedPath(path) {
    return PROTECTED_PATHS.findIndex((e) => e === path) !== -1;
  }
}
