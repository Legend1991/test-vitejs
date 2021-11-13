import React, { useMemo } from 'react';
import Presenter from './presenter';
import DropdownView from './DropdownView';

export default function Dropdown(props) {
  const presenter = useMemo(() => new Presenter(), []);
  const {
    selectedName, selectedNameHidden, selectedDescription,
    selectedDescriptionHidden, optionList, placeholder, placeholderHidden,
  } = presenter.present(props);

  return (
    <DropdownView
      selectedName={selectedName}
      selectedNameHidden={selectedNameHidden}
      selectedDescription={selectedDescription}
      selectedDescriptionHidden={selectedDescriptionHidden}
      placeholder={placeholder}
      placeholderHidden={placeholderHidden}
      optionList={optionList}
    />
  );
}
