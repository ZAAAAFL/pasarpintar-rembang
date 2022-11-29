import { Link } from "@inertiajs/inertia-react";
import React from "react";

const TopNavBar = ({ user }) => {
  return (
    <nav className="px-3.5 pt-2 pb-0 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="container flex justify-center items-center text-sm">
        {user ? (
          <>
            <button
              type="button"
              className="bg-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 mr-1 md:mr-0"
            >
              <div
                id="user-menu-dropdown"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
                className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-slate-100 rounded-full"
              >
                <span className="font-medium text-slate-700 truncate">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            </button>
            <div
              id="user-dropdown"
              className="z-50 hidden text-base list-none bg-white divide-y divide-slate-300 rounded shadow"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-slate-900 truncate">
                  {user.name}
                </span>
                <span className="block text-sm font-medium text-slate-600 truncate">
                  {user.email}
                </span>
              </div>
              <ul className="py-1" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    href="/user/profile"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Profil
                  </Link>
                </li>
                <li>
                  <Link
                    href={route("logout")}
                    method="post"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href={route('register')}>Daftar</Link>
            <div className="px-2">|</div>
            <Link href={route('login')}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNavBar;
