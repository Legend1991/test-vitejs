import { strictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import ViewSpy from './test-doubles/view-spy.js';
import PresenterSpy from './test-doubles/presenter-spy.js';

describe('ViewUpdater', () => {
  let presenter;
  let view;

  beforeEach(() => {
    presenter = new PresenterSpy();
    view = new ViewSpy(presenter);
  });

  it(`Check initial state`, () => {
    strictEqual(presenter.value, PresenterSpy.STUB_VALUE);
    strictEqual(presenter.invokeCount, 0);
    strictEqual(view.mappedValue, null);
    strictEqual(view.updateCount, 0);
  });

  it(`Map presenter's data to view on initial render`, () => {
    view.render();

    strictEqual(presenter.value, PresenterSpy.STUB_VALUE);
    strictEqual(presenter.invokeCount, 0);
    strictEqual(view.mappedValue, PresenterSpy.STUB_VALUE);
    strictEqual(view.updateCount, 0);
  });

  it(`Update view on a user input event`, async () => {
    await view.fireUserInput(ViewSpy.STUB_EVENT);

    strictEqual(presenter.value, ViewSpy.STUB_EVENT.target.value);
    strictEqual(presenter.invokeCount, 1);
    strictEqual(view.mappedValue, ViewSpy.STUB_EVENT.target.value);
    strictEqual(view.updateCount, 1);
  });

  it(`Update view few times on few user input events`, async () => {
    await view.fireUserInput(ViewSpy.STUB_EVENT);
    await view.fireUserInput(ViewSpy.ANOTHER_EVENT);

    strictEqual(presenter.value, ViewSpy.ANOTHER_EVENT.target.value);
    strictEqual(presenter.invokeCount, 2);
    strictEqual(view.mappedValue, ViewSpy.ANOTHER_EVENT.target.value);
    strictEqual(view.updateCount, 2);
  });
});