import Kurir from "@/Pages/Kurir";
import { Link, usePage } from "@inertiajs/inertia-react";

const NavbarKurir = (props) => {
  console.log(props);
  return (
    <>

      <nav className="bg-sky-600 border-gray-200 text-white px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pasar Pintar</span>
          </a>
          <div className="flex md:order-2">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          </div>
        </div>
      </nav>

    </>
  );
};

export default NavbarKurir;
