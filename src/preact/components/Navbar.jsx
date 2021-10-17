import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">
          daisyUI
        </span>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          <Link className="btn btn-ghost btn-sm rounded-btn" to="/">
            Home
          </Link>
          <Link className="btn btn-ghost btn-sm rounded-btn" to="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}