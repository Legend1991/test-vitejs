import { deepStrictEqual, strictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import Controller from '../../src/test-vitejs/controller.js';

describe('Controller', () => {
  let presenter;
  let controller;

  beforeEach(() => {
    presenter = {
      a: 1,
      b: {},
      c: [],
      d: true,
      e: null,
      invokedArgs: null,
      f(...args) {
        this.invokedArgs = args;
      },
    };
    controller = new Controller(presenter);
  });

  it('Only provide access to presenter methods', () => {
    strictEqual(presenter.a, 1);
    deepStrictEqual(presenter.b, {});
    deepStrictEqual(presenter.c, []);
    strictEqual(presenter.d, true);
    strictEqual(presenter.e, null);
    strictEqual(presenter.invokedArgs, null);
    strictEqual(typeof presenter.f, 'function');

    strictEqual(controller.a, undefined);
    strictEqual(controller.b, undefined);
    strictEqual(controller.c, undefined);
    strictEqual(controller.d, undefined);
    strictEqual(controller.e, undefined);
    strictEqual(controller.invokedArgs, undefined);
    strictEqual(typeof controller.f, 'function');
    strictEqual(controller.f, presenter.f);
  });

  it('Process the arguments with the view\'s extractUserInput method '
      + 'before passing them to the presenter', () => {
    const args = ['arg0', 'arg1', 'arg2'];

    controller.f(...args);

    deepStrictEqual(presenter.invokedArgs, args);
  });
});
