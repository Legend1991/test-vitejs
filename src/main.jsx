import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';

import {history} from './react-router/navigator';
import RouteAuthorizerSwitch from './react-router/route-authorizer-switch';
import './index.css';
import About from './preact/views/About';
import LoginView from './preact/views/LoginView';
import Navbar from './preact/components/Navbar';
import makeLoginPresenter from './factories/make-login-presenter';
import makeRouteAuthorizer from './factories/make-route-authorizer';

const routeAuthorizer = makeRouteAuthorizer();

const Login = () => <LoginView makePresenter={makeLoginPresenter}/>;

ReactDOM.render(
    <Router history={history}>
      <Navbar/>
      <RouteAuthorizerSwitch routeAuthorizer={routeAuthorizer}>
        <Route path="/login" component={Login}/>
        <Route path="/about" component={About}/>
      </RouteAuthorizerSwitch>
    </Router>,
    document.getElementById('app'),
);
