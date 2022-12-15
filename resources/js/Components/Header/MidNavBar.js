import {
  ArrowSmallLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

const MidNavBar = ({ appName, currentUrl, user }) => {
  const back = () => {
    window.history.back();
  };

  return (
    <nav className="px-3.5 py-2 bg-sky-400 text-white">
      <div className="container flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center">
          {currentUrl !== "/" ? (
            <Link onClick={back} as="button">
              <ArrowSmallLeftIcon className="w-6 h-6 mr-2 cursor-pointer" />
            </Link>
          ) : (
            <></>
          )}
          <Link
            href={route("index")}
            className="items-center ml-2"
          >
            <span className="self-center text-lg sm:text-2xl font-semibold">
              <span className="mr-1.5">{appName}</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center md:order-2 mr-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-md text-sm p-2.5 mr-1"
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
              <span className="sr-only">Icon Cari</span>
            </div>
            <input
              type="text"
              id="search-navbar-md-block"
              className="block w-full p-2 pl-10 text-sm text-slate-900 border border-slate-900 rounded-md bg-slate-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Cari..."
            />
          </div>
          {user && (
            <Link href={"/cart"}>
              <div className="relative mr-3">
                <div className="flex items-center justify-center p-2">
                  <ShoppingCartIcon className="h-6 w-6" />
                </div>
                <span className="top-[-1px] left-[17px] absolute p-1 text-[10px] leading-none text-center align-middle bg-red-500 rounded-full">
                  99+
                </span>
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
              className="block w-full p-2 pl-10 text-sm text-slate-900 border border-slate-900 rounded-md bg-slate-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Cari..."
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MidNavBar;
