import {
  ArrowLeftOnRectangleIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  ListBulletIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { useState } from "react";
const Main = (props) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gradient-to-t from-sky-500 via-blue-500 to-cyan-500 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="/img/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/img/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-bold text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Toko Admin
          </h1>
        </div>
        <ul className="pt-6">
          <Link href="/toko-page">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
            >
              <ComputerDesktopIcon className="h-6 w-6 text-white" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left text-white font-semibold duration-200`}
              >
                Dashboard
              </span>
            </li>
          </Link>
          <Link href="/toko-list">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
            >
              <BuildingStorefrontIcon className="h-6 w-6 text-white" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left text-white font-semibold duration-200`}
              >
                Toko
              </span>
            </li>
          </Link>
          <Link href="/toko-kategori">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
            >
              <ListBulletIcon className="h-6 w-6 text-white" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left text-white font-semibold duration-200`}
              >
                Kategori
              </span>
            </li>
          </Link>
          <Link href="/toko-setting">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
            >
              <Cog6ToothIcon className="h-6 w-6 text-white" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left text-white font-semibold duration-200`}
              >
                Setting
              </span>
            </li>
          </Link>
          <Link href="/logout">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 text-white" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left text-white font-semibold duration-200`}
              >
                Keluar
              </span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">{props.children}</div>
    </div>
  );
};
export default Main;
