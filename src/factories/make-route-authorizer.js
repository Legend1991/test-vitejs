import RouteAuthorizer from '../test-vitejs/route-authorizer.js';
import LocalStorageTokenRepository
  from '../web-api/local-storage-token-repository.js';

export default () => {
  const tokenRepository = new LocalStorageTokenRepository();
  return new RouteAuthorizer(tokenRepository);
};
