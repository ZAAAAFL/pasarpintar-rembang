import Main from "@/Components/AdminTemplate/Main";
import { useState } from "react";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./img/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./img/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Admin PasarPintar
          </h1>
          <nav aria-label="alternative nav">
            <div class="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
              <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                <ul class="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                  <li class="mr-3 flex-1">
                    <Link
                      class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2
                        border-blue-600"
                      href="/admin-page"
                    >
                      <HomeIcon class="h-4 w-4 md:h-8 md:w-8 pr-0 md:pr-3" />
                      <span class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li class="mr-3 flex-1">
                    <Link
                      class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2
                        border-purple-600"
                      href="#"
                    >
                      <BuildingStorefrontIcon class="h-4 w-4 md:h-8 md:w-8 pr-0 md:pr-3" />
                      <span class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                        Toko
                      </span>
                    </Link>
                  </li>
                  <li class="mr-3 flex-1">
                    <Link
                      class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2
                        border-green-600"
                      href="#"
                    >
                      <TagIcon class="h-4 w-4 md:h-8 md:w-8 pr-0 md:pr-3" />
                      <span class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                        Kategori
                      </span>
                    </Link>
                  </li>
                  <li class="mr-3 flex-1">
                    <Link
                      class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2
                        border-orange-600"
                      href="#"
                    >
                      <Cog8ToothIcon class="h-4 w-4 md:h-8 md:w-8 pr-0 md:pr-3" />
                      <span class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                        Pengaturan
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`./img/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
<<<<<<< HEAD
      <div className="h-screen flex-1 p-7">
        <Main />
      </div>
=======
>>>>>>> 103d0fd87d907cf87458df704ff47e62c6105178
    </div>
  );
};
export default Sidebar;
