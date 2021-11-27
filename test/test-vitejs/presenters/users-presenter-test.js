import { deepStrictEqual, doesNotThrow, strictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import { given } from 'mocha-testdata';
import UsersPresenter, {
  ENTER_KEY, INITIAL_VIEW_MODEL, BAD_EMAIL_FORMAT_MSG,
} from '../../../src/test-vitejs/presenters/users-presenter.js';
import Utils from '../../utils.js';

const CORRECT_EMAIL_STUB = 'username@example.com';
const WRONG_EMAIL_STUB = 'user@email';

describe('UsersPresenter', () => {
  const initialViewModel = { ...INITIAL_VIEW_MODEL };
  let presenter;

  beforeEach(() => {
    presenter = new UsersPresenter();
  });

  it('Contain initial state', () => {
    deepStrictEqual(presenter.viewModel, initialViewModel);
  });

  it('Invalidate wrong format email on invite button click', () => {
    const changeEvent = Utils.makeChangeEvent(WRONG_EMAIL_STUB);

    presenter.onInviteEmailChange(changeEvent);
    presenter.onInviteClick();

    deepStrictEqual(presenter.viewModel, {
      ...initialViewModel,
      inviteEmailError: BAD_EMAIL_FORMAT_MSG,
      isInviteEmailInputStatePrimary: false,
      isInviteEmailInputStateError: true,
    });
    strictEqual(changeEvent.target.value, WRONG_EMAIL_STUB);
  });

  it('Invalidate wrong format email on invite input enter key up', () => {
    const changeEvent = Utils.makeChangeEvent(WRONG_EMAIL_STUB);
    const keyUpEvent = Utils.makeKeyUpEvent(ENTER_KEY, WRONG_EMAIL_STUB);

    presenter.onInviteEmailChange(changeEvent);
    presenter.onInviteKeyUp(keyUpEvent);

    deepStrictEqual(presenter.viewModel, {
      ...initialViewModel,
      inviteEmailError: BAD_EMAIL_FORMAT_MSG,
      isInviteEmailInputStatePrimary: false,
      isInviteEmailInputStateError: true,
    });
    strictEqual(changeEvent.target.value, WRONG_EMAIL_STUB);
  });

  it('Validate correct format email on invite input enter key up', () => {
    const changeEvent = Utils.makeChangeEvent(CORRECT_EMAIL_STUB);
    const keyUpEvent = Utils.makeKeyUpEvent(ENTER_KEY, CORRECT_EMAIL_STUB);

    presenter.onInviteEmailChange(changeEvent);
    presenter.onInviteKeyUp(keyUpEvent);

    deepStrictEqual(presenter.viewModel, initialViewModel);
    strictEqual(changeEvent.target.value, '');
  });

  it('Validate correct format email on invite button click', () => {
    const changeEvent = Utils.makeChangeEvent(CORRECT_EMAIL_STUB);

    presenter.onInviteEmailChange(changeEvent);
    presenter.onInviteClick();

    deepStrictEqual(presenter.viewModel, initialViewModel);
    strictEqual(changeEvent.target.value, '');
  });

  given('Shift', 'a', '1', '@', '.', '+', '_')
    .it(
      'Ignore invite input key up event when it\'s not triggered by enter key',
      (key) => {
        const changeEvent = Utils.makeChangeEvent(WRONG_EMAIL_STUB);
        const keyUpEvent = Utils.makeKeyUpEvent(key, WRONG_EMAIL_STUB);

        presenter.onInviteEmailChange(changeEvent);
        presenter.onInviteKeyUp(keyUpEvent);

        deepStrictEqual(presenter.viewModel, initialViewModel);
        strictEqual(changeEvent.target.value, WRONG_EMAIL_STUB);
      },
    );

  it('Should not throw an error on onInviteClick and onInviteEnterKeyUp'
      + 'without invite email change event first', () => {
    doesNotThrow(() => presenter.onInviteClick(), TypeError);
    doesNotThrow(
      () => presenter.onInviteKeyUp(Utils.makeKeyUpEvent(ENTER_KEY)),
      TypeError,
    );
  });
});
