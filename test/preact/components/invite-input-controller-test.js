import { doesNotThrow, strictEqual } from 'assert';
import { beforeEach, describe, it } from 'mocha';
import { given } from 'mocha-testdata';
import Controller, { ENTER_KEY }
  from '../../../src/preact/components/InviteInput/controller.js';

describe('InviteInputController', () => {
  const INPUT_VALUE_STUB = 'username@example.com';

  let controller;
  let clientSpy;
  let inputRefSpy;
  let keyUpEventSpy;

  beforeEach(() => {
    clientSpy = {
      inviteValue: null,
      onInvite(value) { this.inviteValue = value; },
    };
    clientSpy.onInvite = clientSpy.onInvite.bind(clientSpy);
    inputRefSpy = { current: { value: INPUT_VALUE_STUB } };
    keyUpEventSpy = { key: ENTER_KEY, target: { value: INPUT_VALUE_STUB } };
    controller = new Controller(clientSpy);
  });

  it('Call onInvite callback and clear input field value '
      + 'on invite button click', () => {
    controller.onButtonClick(inputRefSpy);

    strictEqual(inputRefSpy.current.value, '');
    strictEqual(clientSpy.inviteValue, INPUT_VALUE_STUB);
  });

  it('Call onInvite callback and clear input field value '
      + 'on input enter key up event', () => {
    controller.onInputKeyUp(keyUpEventSpy);

    strictEqual(keyUpEventSpy.target.value, '');
    strictEqual(clientSpy.inviteValue, INPUT_VALUE_STUB);
  });

  given('Shift', 'a', '1', '@', '.', '+', '_')
    .it(
      'Ignore input key up event when it\'s not triggered by enter key',
      (key) => {
        keyUpEventSpy = { ...keyUpEventSpy, key };

        controller.onInputKeyUp(keyUpEventSpy);

        strictEqual(keyUpEventSpy.target.value, INPUT_VALUE_STUB);
        strictEqual(clientSpy.inviteValue, null);
      },
    );

  it('Should not call onInvite callback if it\'s not provided', () => {
    controller = new Controller({});

    doesNotThrow(() => controller.onButtonClick(inputRefSpy), TypeError);
    doesNotThrow(() => controller.onInputKeyUp(keyUpEventSpy), TypeError);
  });
});
