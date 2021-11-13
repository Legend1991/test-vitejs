import { deepStrictEqual, strictEqual } from 'assert';
import { describe, it } from 'mocha';
import Presenter from '../../../src/preact/components/Dropdown/presenter.js';

describe('DropdownPresenter', () => {
  it('Provide option list with selected mark, onClick handler '
      + 'for each option and name, description of a selected option.', () => {
    let clickedValue = null;
    const clickedIndex = 0;
    const selectedIndex = 1;
    const props = {
      onSelect(value) { clickedValue = value; },
      placeholder: 'Please select an option',
      value: 'option2',
      options: [
        {
          value: 'option1',
          name: 'Option One',
          description: 'Option description one',
        },
        {
          value: 'option2',
          name: 'Option Two',
          description: 'Option description two',
        },
      ],
    };
    const presenter = new Presenter();

    const {
      selectedName, selectedNameHidden, selectedDescription,
      selectedDescriptionHidden, optionList, placeholder, placeholderHidden,
    } = presenter.present(props);
    optionList[clickedIndex].onClick();

    strictEqual(selectedName, props.options[selectedIndex].name);
    strictEqual(selectedNameHidden, false);
    strictEqual(selectedDescription, props.options[selectedIndex].description);
    strictEqual(selectedDescriptionHidden, false);
    strictEqual(placeholder, props.placeholder);
    strictEqual(placeholderHidden, true);
    strictEqual(clickedValue, props.options[clickedIndex].value);
    deepStrictEqual(optionList, [
      {
        ...props.options[0],
        // To avoid AssertionError:
        // Values have same structure but are not reference-equal
        onClick: optionList[0].onClick,
        selected: false,
      },
      {
        ...props.options[1],
        // To avoid AssertionError:
        // Values have same structure but are not reference-equal
        onClick: optionList[1].onClick,
        selected: true,
      },
    ]);
    strictEqual(typeof optionList[0].onClick, 'function');
    strictEqual(typeof optionList[1].onClick, 'function');
  });

  it('Set name as empty string, substitute description with placeholder '
      + 'and set each option as unselected', () => {
    const props = {
      onSelect() {},
      placeholder: 'Please select an option',
      value: '',
      options: [
        {
          value: 'option1',
          name: 'Option One',
          description: 'Option description one',
        },
        {
          value: 'option2',
          name: 'Option Two',
          description: 'Option description two',
        },
      ],
    };
    const presenter = new Presenter();

    const {
      selectedName, selectedNameHidden, selectedDescription,
      selectedDescriptionHidden, optionList, placeholder, placeholderHidden,
    } = presenter.present(props);

    strictEqual(selectedName, undefined);
    strictEqual(selectedNameHidden, true);
    strictEqual(selectedDescription, undefined);
    strictEqual(selectedDescriptionHidden, true);
    strictEqual(placeholder, props.placeholder);
    strictEqual(placeholderHidden, false);
    deepStrictEqual(optionList, [
      {
        ...props.options[0],
        // To avoid AssertionError:
        // Values have same structure but are not reference-equal
        onClick: optionList[0].onClick,
        selected: false,
      },
      {
        ...props.options[1],
        // To avoid AssertionError:
        // Values have same structure but are not reference-equal
        onClick: optionList[1].onClick,
        selected: false,
      },
    ]);
    strictEqual(typeof optionList[0].onClick, 'function');
    strictEqual(typeof optionList[1].onClick, 'function');
  });
});
