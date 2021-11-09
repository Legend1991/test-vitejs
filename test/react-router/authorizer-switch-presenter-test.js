import {deepStrictEqual, strictEqual} from 'assert';
import {describe, it} from 'mocha';
import Presenter
  from '../../src/react-router/AuthorizerSwitch/presenter.js';

describe('AuthorizerSwitchPresenter', () => {
  it(`Redirect to new location when a user is not authorized`, () => {
    const location = {pathname: '/about'};
    const newPathname = '/login';
    const presenter = new Presenter({route: () => newPathname});

    const {shouldRedirect, newLocation} = presenter.route(location);

    strictEqual(shouldRedirect, true);
    deepStrictEqual(newLocation, {
      pathname: newPathname,
      state: {
        from: location,
      },
    });
  });

  it(`Keep going to current location when a user is authorized`, () => {
    const location = {pathname: '/about'};
    const presenter = new Presenter({route: () => location.pathname});

    const {shouldRedirect, newLocation} = presenter.route(location);

    strictEqual(shouldRedirect, false);
    strictEqual(newLocation, undefined);
  });
});