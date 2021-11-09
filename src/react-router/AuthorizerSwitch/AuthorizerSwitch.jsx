import {useMemo} from 'react';
import {Redirect, Switch, useLocation} from 'react-router-dom';

import Presenter from './presenter.js';

const AuthorizerSwitch = ({children, routeAuthorizer}) => {
  const location = useLocation();
  const presenter = useMemo(() => new Presenter(routeAuthorizer), []);
  const {shouldRedirect, newLocation} = presenter.route(location);

  return (
      <Switch>
        {shouldRedirect ? <Redirect to={newLocation}/> : null}
        {children}
      </Switch>
  );
};

export default AuthorizerSwitch;