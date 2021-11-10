export default class Presenter {
  present({options, value, onSelect, placeholder}) {
    const selectedOption = options.find(o => o.value === value);

    return {
      name: selectedOption?.name || '',
      description: selectedOption?.description || placeholder,
      optionList: options.map(o => ({
        ...o,
        selected: o.value === value,
        onClick: onSelect.bind(null, o.value),
      })),
    };
  }
}