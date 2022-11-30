import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/inertia-react";

const MidNavBar = ({ appName, url, user }) => {
  return (
    <nav className="px-3.5 py-2 bg-sky-400 text-white">
      <div className="container flex flex-wrap items-center justify-between">
        <Link href={route("index")} className="items-center ml-2">
          <span className="self-center xs:flex text-2xl font-semibold">
            <span className="mr-1.5">{appName}</span>
          </span>
        </Link>
        <div className="flex items-center md:order-2 mr-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-md text-sm p-2.5 mr-1"
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
            <span className="sr-only">Cari</span>
          </button>
          <div className="relative w-72 hidden md:block mr-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-white"
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
              <span className="sr-only">Icon Cari</span>
            </div>
            <input
              type="text"
              id="search-navbar-md-block"
              className="block w-full p-2 pl-10 text-sm text-slate-900 border border-slate-400 rounded-md bg-slate-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Cari..."
            />
          </div>
          {user && (
            <Link>
              <div className="relative mr-3">
                <div className="flex items-center justify-center p-2">
                <ShoppingCartIcon className="h-6 w-6" />
              </div>
              <span className="top-[-1px] left-[17px] absolute p-1 text-[10px] leading-none text-center align-middle bg-red-500 rounded-full">
                99+
              </span>
                {/* <button
                  class="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                  aria-label="Cart"
                >
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span className="absolute inset-0 object-right-top -mr-6">
                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                      99+
                    </div>
                  </span>
                </button> */}
              </div>
            </Link>
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
              placeholder="Cari..."
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MidNavBar;
