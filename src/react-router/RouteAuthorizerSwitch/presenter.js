export default class Presenter {
  #routeAuthorizer;

  constructor(routeAuthorizer) {
    this.#routeAuthorizer = routeAuthorizer;
  }

  route(location) {
    const authorizedPathname = this.#routeAuthorizer.route(location.pathname);
    const shouldRedirect = location.pathname !== authorizedPathname;

    if (shouldRedirect)
      return {
        shouldRedirect,
        newLocation: {
          pathname: authorizedPathname,
          state: {
            from: location,
          },
        },
      };

    return {shouldRedirect};
  }
}