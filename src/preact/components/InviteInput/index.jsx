import { useMemo } from 'preact/hooks';
import InviteInputView from './InviteInputView';
import Controller from './controller';

export default function InviteInput({ className, ...restProps }) {
  const controller = useMemo(() => new Controller(restProps), []);
  return <InviteInputView className={className} controller={controller} />;
}
