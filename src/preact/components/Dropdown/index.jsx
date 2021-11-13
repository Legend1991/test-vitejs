import React, { useMemo } from 'react';
import Presenter from './presenter';
import DropdownView from './DropdownView';

export default function Dropdown(props) {
  const presenter = useMemo(() => new Presenter(), []);
  const {
    selectedName, selectedDescription, optionList,
  } = presenter.present(props);

  return (
    <DropdownView
      selectedName={selectedName}
      selectedDescription={selectedDescription}
      optionList={optionList}
    />
  );
}
