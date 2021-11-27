const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const ENTER_KEY = 'Enter';
export const BAD_EMAIL_FORMAT_MSG = 'Email should be correct format';
export const INITIAL_VIEW_MODEL = {
  inviteEmailError: '',
  isInviteEmailInputStatePrimary: true,
  isInviteEmailInputStateError: false,
};

export default class UsersPresenter {
  viewModel = { ...INITIAL_VIEW_MODEL };

  #inviteEmail = '';
  #inviteInput;

  onInviteEmailChange = ({ target }) => {
    this.#inviteInput = target;
    this.#inviteEmail = target.value;
  };

  onInviteKeyUp = ({ key }) => {
    if (key === ENTER_KEY) this.#invite();
  };

  onInviteClick = () => {
    this.#invite();
  };

  #invite() {
    const isInviteEmailFormatCorrect = EMAIL_REGEX.test(this.#inviteEmail);

    this.viewModel.inviteEmailError = isInviteEmailFormatCorrect
      ? '' : BAD_EMAIL_FORMAT_MSG;
    this.viewModel.isInviteEmailInputStatePrimary = isInviteEmailFormatCorrect;
    this.viewModel.isInviteEmailInputStateError = !isInviteEmailFormatCorrect;

    if (isInviteEmailFormatCorrect) {
      this.#inviteInput.value = '';
    }
  }
}
