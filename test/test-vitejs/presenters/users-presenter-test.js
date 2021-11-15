import { deepStrictEqual, strictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import UsersPresenter, { INITIAL_VIEW_MODEL, BAD_EMAIL_FORMAT_MSG } from
  '../../../src/test-vitejs/presenters/users-presenter.js';

const CORRECT_EMAIL = 'username@example.com';
const INVITE_INPUT_VALUE_STUB = 'user@email';

describe('UsersPresenter', () => {
  const initialViewModel = { ...INITIAL_VIEW_MODEL };
  let inviteInputSpy;
  let presenter;

  beforeEach(() => {
    inviteInputSpy = {
      value: INVITE_INPUT_VALUE_STUB,
      clear() { this.value = ''; },
    };
    presenter = new UsersPresenter();
    presenter.setInviteInput(inviteInputSpy);
  });

  it('Contain initial state', () => {
    deepStrictEqual(presenter.viewModel, initialViewModel);
  });

  it('Invalidate invite email that is wrong format', () => {
    presenter.onInviteEmailChange('user@email');
    presenter.onInviteClick();

    deepStrictEqual(presenter.viewModel, {
      ...initialViewModel,
      inviteEmailError: BAD_EMAIL_FORMAT_MSG,
      isInviteEmailInputStatePrimary: false,
      isInviteEmailInputStateError: true,
    });
    strictEqual(inviteInputSpy.value, INVITE_INPUT_VALUE_STUB);
  });

  it('Validate invite email that is correct format', () => {
    presenter.onInviteEmailChange(CORRECT_EMAIL);
    presenter.onInviteClick();

    deepStrictEqual(presenter.viewModel, initialViewModel);
    strictEqual(inviteInputSpy.value, '');
  });
});
