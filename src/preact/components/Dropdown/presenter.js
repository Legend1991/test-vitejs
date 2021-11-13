export default class Presenter {
  #viewModel;

  get viewModel() {
    return this.#viewModel;
  }

  present({
    options, value, onSelect, placeholder,
  }) {
    const selectedOption = options.find((o) => o.value === value);

    this.#viewModel = {
      selectedName: selectedOption?.name,
      selectedNameHidden: !selectedOption,
      selectedDescription: selectedOption?.description,
      placeholder,
      placeholderHidden: Boolean(selectedOption),
      selectedDescriptionHidden: !selectedOption,
      optionList: options.map((o) => ({
        ...o,
        selected: o.value === value,
        onClick: onSelect.bind(null, o.value),
      })),
    };
  }
}
