import LoginPresenter from "../test-vitejs/presenters/login-presenter";
import AuthenticatorSpy
  from "../../test/test-vitejs/test-doubles/authenticator-spy";
import navigator from "../preact/navigator";

export default () => {
  return new LoginPresenter(new AuthenticatorSpy(), navigator);
};