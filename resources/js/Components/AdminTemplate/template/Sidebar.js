import Main from "@/Components/AdminTemplate/Main";
import NavLink from "@/Components/NavLink";
import { useState } from "react";
const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", link: "/admin-page" },
    { title: "Toko", src: "Chat", link: "/toko" },
    { title: "Kategori ", src: "Calendar", link: "/kategori" },
    { title: "Pengaturan", src: "Setting", link: "/pengaturan" },
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
                <NavLink
                  to={Menu.link}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {Menu.title}
                </NavLink>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">{children}</div>
    </div>
  );
};
export default Sidebar;
