import {deepStrictEqual, strictEqual} from 'assert';
import {describe, it} from 'mocha';
import Presenter
  from '../../../src/react-router/RouteAuthorizerSwitch/presenter.js';

describe('RouteAuthorizerSwitchPresenter', () => {
  it(`Redirect to new location when a user is not authorized`, () => {
    const location = {pathname: '/about'};
    const newLocation = {pathname: '/login', state: {from: location}};
    const presenter = new Presenter({route: () => newLocation.pathname});

    const route = presenter.route(location);

    strictEqual(route.shouldRedirect, true);
    deepStrictEqual(route.newLocation, newLocation);
  });

  it(`Keep going to current location when a user is authorized`, () => {
    const location = {pathname: '/about'};
    const presenter = new Presenter({route: () => location.pathname});

    const {shouldRedirect, newLocation} = presenter.route(location);

    strictEqual(shouldRedirect, false);
    deepStrictEqual(newLocation, undefined);
  });
});