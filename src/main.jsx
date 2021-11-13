import React from 'react';
import { render } from 'preact';
import { Router, Route } from 'react-router-dom';

import { history } from './react-router/navigator';
import AuthorizerSwitch from './react-router/AuthorizerSwitch';
import './index.css';
import About from './preact/views/About';
import UsersView from './preact/views/UsersView';
import LoginView from './preact/views/LoginView';
import MainLayout from './preact/layouts/MainLayout';
import makeLoginPresenter from './factories/make-login-presenter';
import makeRouteAuthorizer from './factories/make-route-authorizer';

const routeAuthorizer = makeRouteAuthorizer();

function Login() {
  return <LoginView makePresenter={makeLoginPresenter} />;
}

render(
  <Router history={history}>
    <AuthorizerSwitch routeAuthorizer={routeAuthorizer}>
      <Route path="/login" component={Login} />
      <MainLayout>
        <Route path="/about" component={About} />
        <Route path="/users" component={UsersView} />
      </MainLayout>
    </AuthorizerSwitch>
  </Router>,
  document.getElementById('app'),
);
