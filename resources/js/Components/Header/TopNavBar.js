import { Menu, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid"

const TopNavBar = ({ user }) => {
  return (
    <nav className="px-3.5 py-1 bg-white">
      <div className="container text-sm">
        <div className="flex justify-end items-center">
          {user !== null ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <ChevronDownIcon
                  className="mr-2 -ml-1 h-5 w-5 text-black hover:text-gray-700"
                  aria-hidden="true"
                />
                <span className="font-medium text-slate-700 truncate">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 origin-top-right z-50 text-base list-none bg-white divide-y divide-slate-300 rounded shadow">
                  <div className="px-4 py-3">
                    <Menu.Item>
                      <span className="block text-sm text-slate-900 truncate">
                        {user.name}
                      </span>
                    </Menu.Item>
                    <Menu.Item>
                      <span className="block text-sm text-slate-900 truncate">
                        {user.email}
                      </span>
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      <Link
                        href="/user/profile"
                        className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100"
                        as="button"
                      >
                        Profil
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href={route("logout")}
                        method="post"
                        className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100"
                        as="button"
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="flex justify-end items-center">
              <Link href={route("register")} as="button">
                Daftar
              </Link>
              <div className="px-1">|</div>
              <Link href={route("login")} as="button">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
