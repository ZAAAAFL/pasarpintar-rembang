import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav
        aria-label="menu nav"
        className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0"
      >
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <Link href="#" aria-label="Home">
              <h1 className="font-bold text-1xl md:text-2xl pl-2">{Head}</h1>
            </Link>
          </div>

          <div className="flex md:w-1/3 justify-center md:justify-start text-white px-2">
            <span className="relative w-full">
              <div
                className="absolute search-icon"
                style="top: 1rem; left: .8rem;"
              >
                <svg
                  className="fill-current pointer-events-none text-white w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
              </div>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
