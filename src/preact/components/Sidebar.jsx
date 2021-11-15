import { NavLink } from 'react-router-dom';
import {
  UsersIcon, LogoutIcon, CogIcon,
} from '@heroicons/react/outline';

export default function Sidebar() {
  return (
    <div className={
        'menu py-4 shadow-lg bg-neutral text-neutral-content '
        + 'rounded-box min-w-min justify-between'
      }
    >
      <ul className="!pl-0">
        <li className="hover-bordered">
          <NavLink to="/users">
            <UsersIcon className="w-6 h-6 mr-2" />
            Users
          </NavLink>
        </li>
        <li className="hover-bordered">
          <NavLink to="/settings">
            <CogIcon className="w-6 h-6 mr-2" />
            Settings
          </NavLink>
        </li>
      </ul>
      <div className="flex flex-row px-4">
        <div
          data-tip="Sign Out"
          className="tooltip tooltip-warning"
        >
          <button type="button" className="btn btn-ghost btn-square mr-2">
            <LogoutIcon className="w-6 h-6" />
          </button>
        </div>
        <div>
          <div className="font-bold">Hart Hagerty</div>
          <div className="text-sm opacity-50">HartH@example.com</div>
        </div>
      </div>
    </div>
  );
}
