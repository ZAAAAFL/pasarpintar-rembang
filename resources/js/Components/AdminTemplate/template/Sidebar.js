import {
  BuildingStorefrontIcon,
  Cog8ToothIcon,
  HomeIcon,
  TagIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Sidebar = () => {
  return (
    <nav aria-label="alternative nav">
      <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
        <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
            <li className="mr-3 flex-1">
              <Link
                className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2
                        border-blue-600"
                href="/admin-page"
              >
                <HomeIcon className="h-4 w-4 md:h-8 md:w-8 pr-0 md:pr-3" />
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="mr-3 flex-1">
              <Link
                className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2
                        border-purple-600"
                href="#"
              >
                <BuildingStorefrontIcon className="h-4 w-4 md:h-8 md:w-8 pr-0 md:pr-3" />
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Toko
                </span>
              </Link>
            </li>
            <li className="mr-3 flex-1">
              <Link
                className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2
                        border-green-600"
                href="#"
              >
                <TagIcon className="h-4 w-4 md:h-8 md:w-8 pr-0 md:pr-3" />
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Kategori
                </span>
              </Link>
            </li>
            <li className="mr-3 flex-1">
              <Link
                className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2
                        border-orange-600"
                href="#"
              >
                <Cog8ToothIcon className="h-4 w-4 md:h-8 md:w-8 pr-0 md:pr-3" />
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Pengaturan
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
