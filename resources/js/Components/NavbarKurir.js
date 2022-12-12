import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Fragment } from "react";

const NavbarKurir = ({ user }) => {
  console.log(user);

  return (
    <>

      <nav className="bg-sky-600 border-gray-200 text-white px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pasar Pintar</span>
          </a>
          <div className="flex md:order-2">
            {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button> */}


            {
              user.user !== null ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-transparent py-1 text-sm font-medium text-white hover:text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <ChevronDownIcon
                      className="mr-2 -ml-1 h-5 w-5 text-white hover:text-gray-700"
                      aria-hidden="true"
                    />

                    < span className="font-medium text-white hover:text-gray-700 truncate">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </Menu.Button >
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

                            {user.user.name}
                          </span >
                        </Menu.Item >
                        <Menu.Item>
                          <span className="block text-sm text-slate-900 truncate">
                            {user.user.email}
                          </span >
                        </Menu.Item >
                      </div >
                      <div className="py-1">
                        <Menu.Item>
                          <Link
                            href={`kurir/profile/${user.user.id}`}
                            className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100" as="button">
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
                    </Menu.Items >
                  </Transition >
                </Menu >
              ) : (
                <div className="flex justify-end items-center">
                  <Link href={route("register")} className="text-slate-800" as="button">
                    Daftar
                  </Link>
                  <div className="px-1">|</div>
                  <Link href={route("login")} className="text-slate-800" as="button">
                    Login
                  </Link>
                </div>
              )}
          </div >
        </div >
      </nav >

    </>
  );
};

export default NavbarKurir;
