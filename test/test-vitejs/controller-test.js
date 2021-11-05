import {deepStrictEqual, strictEqual} from 'assert';
import {beforeEach, describe, it} from 'mocha';
import Controller from '../../src/test-vitejs/controller.js';

describe('Controller', () => {
  let presenter;
  let view;
  let controller;

  beforeEach(() => {
    presenter = {
      a: 1, b: {}, c: [], d: true, e: null,
      invokedArg: null,
      f(a) {
        this.invokedArg = a;
      },
    };
    view = {
      invokedArgs: null,
      extractUserInput(...args) {
        this.invokedArgs = args;
        return args[0];
      },
    };
    controller = new Controller(presenter, view);
  });

  it(`Only provide access to presenter methods`, () => {
    strictEqual(view.invokedArgs, null);

    strictEqual(presenter.a, 1);
    deepStrictEqual(presenter.b, {});
    deepStrictEqual(presenter.c, []);
    strictEqual(presenter.d, true);
    strictEqual(presenter.e, null);
    strictEqual(presenter.invokedArg, null);
    strictEqual(typeof presenter.f, 'function');

    strictEqual(controller.a, undefined);
    strictEqual(controller.b, undefined);
    strictEqual(controller.c, undefined);
    strictEqual(controller.d, undefined);
    strictEqual(controller.e, undefined);
    strictEqual(controller.invokedArg, undefined);
    strictEqual(typeof controller.f, 'function');
  });

  it(`Process the arguments with the view's extractUserInput method before passing them to the presenter`,
      () => {
        const args = ['arg0', 'arg1', 'arg2'];

        controller.f(...args);

        deepStrictEqual(view.invokedArgs, args);
        strictEqual(presenter.invokedArg, args[0]);
      });
});