import { Link, usePage } from "@inertiajs/inertia-react";

const TopNavBar = ({ appName, user, url }) => {
  return (
    <nav className="px-3.5 pt-4 pb-0 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="container flex flex-wrap items-center justify-between">
        <Link href={route("index")} className="items-center">
          <span className="self-center xs:flex text-2xl font-semibold">
            <span className="mr-1.5">{appName}</span>
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-md text-sm p-2.5 mr-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block mr-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-800"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar-md-block"
              className="block w-full p-2 pl-10 text-sm text-slate-900 border border-slate-400 rounded-md bg-slate-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Search..."
            />
          </div>
          {user && (
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
          )}
        </div>
        <div
          id="navbar-search"
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-800"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar-md-hidden"
              className="block w-full p-2 pl-10 text-sm text-slate-900 border border-slate-400 rounded-md bg-slate-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
