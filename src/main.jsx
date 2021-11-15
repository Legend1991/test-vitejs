import { render } from 'preact';
import { Router, Route } from 'react-router-dom';

import { history } from './react-router/navigator';
import AuthorizerSwitch from './react-router/AuthorizerSwitch';
import './index.css';
import SettingsView from './preact/views/SettingsView';
import UsersView from './preact/views/UsersView';
import LoginView from './preact/views/LoginView';
import MainLayout from './preact/layouts/MainLayout';
import makeLoginPresenter from './factories/make-login-presenter';
import makeUsersPresenter from './factories/make-users-presenter';
import makeRouteAuthorizer from './factories/make-route-authorizer';

const routeAuthorizer = makeRouteAuthorizer();

function Login() {
  return <LoginView makePresenter={makeLoginPresenter} />;
}

function Users() {
  return <UsersView makePresenter={makeUsersPresenter} />;
}

render(
  <Router history={history}>
    <AuthorizerSwitch routeAuthorizer={routeAuthorizer}>
      <Route path="/login" component={Login} />
      <MainLayout>
        <Route path="/users" component={Users} />
        <Route path="/settings" component={SettingsView} />
      </MainLayout>
    </AuthorizerSwitch>
  </Router>,
  document.getElementById('app'),
);
