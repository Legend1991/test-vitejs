import {useMemo} from 'react';
import Presenter from './presenter';
import DropdownView from './DropdownView';

export default function Dropdown(props) {
  const presenter = useMemo(() => new Presenter(), []);
  return <DropdownView {...presenter.present(props)}/>;
}