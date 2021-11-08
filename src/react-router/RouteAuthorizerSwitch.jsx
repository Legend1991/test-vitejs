import {Redirect, Switch, useLocation} from 'react-router-dom';

const RouteAuthorizerSwitch = ({children, routeAuthorizer}) => {
  const location = useLocation();
  const authorizedPathname = routeAuthorizer.route(location.pathname);

  return (
      <Switch>
        {location.pathname !== authorizedPathname ?
            <Redirect to={{
              pathname: authorizedPathname,
              state: {from: location},
            }}/> : null}
        {children}
      </Switch>
  );
};

export default RouteAuthorizerSwitch;