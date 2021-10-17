import ReactDOM from 'react-dom';
import {Router, Switch, Route, Link} from "react-router-dom";

import {history} from './preact/navigator';
import './index.css';
import About from './preact/views/About';
import LoginView from './preact/views/LoginView';
import Navbar from './preact/components/Navbar';
import makeLoginPresenter from './factories/make-login-presenter';

ReactDOM.render(
  <Router history={history}>
    <div>
      <Navbar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <LoginView makePresenter={makeLoginPresenter} />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('app')
);
