import {NavLink} from 'react-router-dom';
import {AnnotationIcon, UsersIcon} from '@heroicons/react/outline';

export default function Sidebar() {
  return (
      <ul class="menu py-4 shadow-lg bg-neutral text-neutral-content rounded-box w-40">
        <li class="hover-bordered">
          <NavLink to="/about">
            <AnnotationIcon className="w-6 h-6 mr-2"/>
            About
          </NavLink>
        </li>
        <li class="hover-bordered">
          <NavLink to="/users">
            <UsersIcon className="w-6 h-6 mr-2"/>
            Users
          </NavLink>
        </li>
      </ul>
  );
}