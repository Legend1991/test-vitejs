export const ENTER_KEY = 'Enter';

export default class Controller {
  #onInvite;

  constructor({onInvite}) {
    const dummyFunction = () => {};
    this.#onInvite = onInvite || dummyFunction;
  }

  onInputKeyUp = ({key, target}) => {
   if (key === ENTER_KEY)
     this.#invite(target);
  }

  onButtonClick = ({current}) => {
    this.#invite(current);
  }

  #invite(inputEl) {
    this.#onInvite(inputEl.value);
    inputEl.value = '';
  }
}