import {NavLink} from 'react-router-dom';

export default function Sidebar() {
  return (
      <ul class="menu py-4 shadow-lg bg-accent text-neutral-content rounded-box w-40">
        <li class="hover-bordered">
          <NavLink to="/about">
            About
          </NavLink>
        </li>
        <li class="hover-bordered">
          <NavLink to="/users">
            Users
          </NavLink>
        </li>
      </ul>
  );
}