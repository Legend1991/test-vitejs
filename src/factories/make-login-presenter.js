import LoginPresenter from "../test-vitejs/presenters/login-presenter";
import Authenticator from '../test-vitejs/authenticator.js';
import FetchAuthGateway from '../web-api/fetch-auth-gateway.js';
import LocalStorageTokenRepository
  from '../web-api/local-storage-token-repository.js';
import navigator from "../react-router/navigator";

export default () => {
  const authGateway = new FetchAuthGateway();
  const tokenRepository = new LocalStorageTokenRepository();
  const authenticator = new Authenticator(authGateway, tokenRepository);
  return new LoginPresenter(authenticator, navigator);
};