import { ArrowLeftCircleIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/inertia-react";

import React, { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <div
        className={
          "${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-dark-purple relative"
        }
      >
        <ArrowLeftCircleIcon
          className={
            "text-white bg-dark-purple absolute cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple rounded-full ${!open && 'rotate-180'}"
          }
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <UserCircleIcon
            className={"cursor-pointer duration-500 text-white"}
          />
          <h1
            className={
              "text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}"
            }
          >
            Admin PasarPintar
          </h1>
        </div>
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Home Page</h1>
      </div>
    </div>
  );
};

export default Sidebar;
