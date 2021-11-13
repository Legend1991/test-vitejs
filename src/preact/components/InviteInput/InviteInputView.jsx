import { useRef } from 'preact/hooks';
import { UserAddIcon } from '@heroicons/react/outline';

export default function InviteInputView({ controller, className }) {
  const inputRef = useRef(null);

  return (
    <div className={`form-control ${className}`}>
      <label htmlFor="emailInput" className="label">
        <span className="label-text">Invite collaborators by email</span>
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          onKeyUp={controller.onInputKeyUp}
          placeholder="Please enter an email of a person you want to invite"
          className="w-full pr-16 input input-primary input-bordered"
        />
        <button
          type="button"
          onClick={controller.onButtonClick.bind(controller, inputRef)}
          className="absolute top-0 right-0 rounded-l-none btn btn-primary"
        >
          <UserAddIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
