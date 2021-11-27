import { useRef } from 'preact/hooks';
import { UserAddIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

export default function InviteInput({
  className, onChange, onKeyUp, onInvite, isStatePrimary,
  isStateError, error,
}) {
  const inviteInputClass = classNames('w-full pr-16 input input-bordered', {
    'input-primary': isStatePrimary,
    'input-error': isStateError,
  });

  const inviteButtonClass = classNames(
    'absolute top-0 right-0 rounded-l-none btn',
    {
      'btn-primary': isStatePrimary,
      'btn-error': isStateError,
    },
  );

  return (
    <div className={`form-control ${className}`}>
      <label htmlFor="emailInput" className="label">
        <span className="label-text">Invite collaborators by email</span>
      </label>
      <div className="relative">
        <input
          type="text"
          onKeyUp={onKeyUp}
          onChange={onChange}
          placeholder="Please enter an email to invite"
          className={inviteInputClass}
        />
        <button
          type="button"
          onClick={onInvite}
          className={inviteButtonClass}
        >
          <UserAddIcon className="w-5 h-5" />
        </button>
      </div>
      <label className="label">
        <span className="label-text-alt">
          {error}
                  &nbsp;
        </span>
      </label>
    </div>
  );
}
