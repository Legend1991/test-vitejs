import {useMemo} from 'react';
import InviteInputView from './InviteInputView';
import Controller from './controller';

export default function InviteInput(props) {
  const controller = useMemo(() => new Controller(props), []);
  return <InviteInputView {...props} controller={controller}/>;
}