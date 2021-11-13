import { useMemo } from 'preact/hooks';
import Presenter from './presenter';
import DropdownView from './DropdownView';

export default function Dropdown(props) {
  const presenter = useMemo(() => new Presenter(), []);
  presenter.present(props);

  return (
    <DropdownView model={presenter.viewModel} />
  );
}
