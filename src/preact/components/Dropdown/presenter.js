export default class Presenter {
  present({
    options, value, onSelect, placeholder,
  }) {
    const selectedOption = options.find((o) => o.value === value);

    return {
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
