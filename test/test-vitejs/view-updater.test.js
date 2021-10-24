import { deepStrictEqual, strictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import ViewSpy from './test-doubles/view-spy.js';
import PresenterSpy from './test-doubles/presenter-spy.js';

describe('ViewUpdater', () => {
  let presenter;
  let view;

  beforeEach(() => {
    presenter = new PresenterSpy({});
    view = new ViewSpy(presenter);
  });

  it(`Check initial state`, () => {
    strictEqual(view.updateCount, 0);
    deepStrictEqual(presenter.viewModel, {});
  });

  describe('ViewModel includes primitive values only', () => {
    const makeInitialViewModel = () => ({ a: 0 });

    beforeEach(() => {
      presenter = new PresenterSpy(makeInitialViewModel());
      view = new ViewSpy(presenter);
    });

    it(`Update view on value change`, () => {
      presenter.viewModel.a = 1;

      strictEqual(view.updateCount, 1);
      strictEqual(presenter.viewModel.a, 1);
    });

    it(`Update view on new value assign`, () => {
      presenter.viewModel.b = 2;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, {
        ...makeInitialViewModel(),
        b: 2
      });
    });
  });

  describe('ViewModel includes complex nested object', () => {
    const makeNestedObject = () => ({ b: 1, c: [2, { d: 3 }] });

    beforeEach(() => {
      presenter = new PresenterSpy({a: makeNestedObject()});
      view = new ViewSpy(presenter);
    });

    it(`Update view on primitive value change`, () => {
      presenter.viewModel.a.b = 2;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: {
        ...makeNestedObject(),
        b: 2
      }});
    });

    it(`Update view on new primitive value assign`, () => {
      presenter.viewModel.a.e = 4;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: {
        ...makeNestedObject(),
        e: 4
      }});
    });

    it(`Update view on direct change array's value`, () => {
      presenter.viewModel.a.c[0] = 4;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: {
        b: 1, c: [4, { d: 3 }]
      }});
    });

    it(`Update view on new value push to array`, () => {
      presenter.viewModel.a.c.push(4);

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: {
        b: 1, c: [2, { d: 3 }, 4]
      }});
    });

    it(`Update view on object's value change inside array`, () => {
      presenter.viewModel.a.c[1].d = 4;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: {
        b: 1, c: [2, { d: 4 }]
      }});
    });

    it(`Update view twice on new object push to array and change it's value`, () => {
      presenter.viewModel.a.c.push({ e: 4 });
      presenter.viewModel.a.c[presenter.viewModel.a.c.length - 1].e = 5;

      strictEqual(view.updateCount, 2);
      deepStrictEqual(presenter.viewModel, { a: {
        b: 1, c: [2, { d: 3 }, { e: 5 }]
      }});
    });
  });

  describe('ViewModel includes complex nested array', () => {
    const makeNestedArray = () => ([1, { b: 2, c: [3] }]);

    beforeEach(() => {
      presenter = new PresenterSpy({a: makeNestedArray()});
      view = new ViewSpy(presenter);
    });

    it(`Update view on primitive value change`, () => {
      presenter.viewModel.a[0] = 4;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: [
        4, { b: 2, c: [3] }
      ]});
    });

    it(`Update view on new value push`, () => {
      presenter.viewModel.a.push(4);

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: [
        ...makeNestedArray(),
        4
      ]});
    });

    it(`Update view on object's value change`, () => {
      presenter.viewModel.a[1].b = 4;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: [
        1, { b: 4, c: [3] }
      ]});
    });

    it(`Update view on new object's value assign`, () => {
      presenter.viewModel.a[1].d = 4;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: [
        1, { b: 2, c: [3], d: 4 }
      ]});
    });

    it(`Update view on array's value change inside object`, () => {
      presenter.viewModel.a[1].c[0] = 4;

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: [
        1, { b: 2, c: [4] }
      ]});
    });

    it(`Update view on new value push to array inside object`, () => {
      presenter.viewModel.a[1].c.push(4);

      strictEqual(view.updateCount, 1);
      deepStrictEqual(presenter.viewModel, { a: [
        1, { b: 2, c: [3, 4] }
      ]});
    });
  });
});