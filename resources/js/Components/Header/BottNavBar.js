import { Link, usePage } from "@inertiajs/inertia-react";

const BottNavBar = ({ url, user }) => {
  return (
    <nav className="px-3.5 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="container flex flex-wrap items-center justify-start md:justify-center">
        <div className="flex items-center md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            className="md:hidden text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-md text-sm p-2.5"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          id="navbar-menu"
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        >
          <ul className="flex flex-col gap-y-1 p-4 mt-4 border border-slate-100 rounded-md bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className={`block py-2 pl-3 pr-4 ${
                  url === "/"
                    ? "text-white bg-blue-600 md:bg-transparent md:text-blue-600"
                    : "text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-600"
                } rounded md:p-0`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/produk"
                className={`block py-2 pl-3 pr-4 ${
                  url === "/produk"
                    ? "text-white bg-blue-600 md:bg-transparent md:text-blue-600"
                    : "text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-600"
                } rounded md:p-0`}
              >
                Produk
              </Link>
            </li>
            {!user && (
              <li>
                <Link
                  href="/login"
                  className={`block py-2 pl-3 pr-4 ${
                    url === "/login"
                      ? "text-white bg-blue-600 md:bg-transparent md:text-blue-600"
                      : "text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-600"
                  } rounded md:p-0`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BottNavBar;
