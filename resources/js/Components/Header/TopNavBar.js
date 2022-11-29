import { Link } from "@inertiajs/inertia-react";
import React from "react";

const TopNavBar = () => {
  return (
    <nav className="px-3.5 pt-2 pb-0 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="container flex justify-center items-center text-sm">
        <Link>Daftar</Link>
        <div className="px-2">|</div>
        <Link>Login</Link>
      </div>
    </nav>
  );
};

export default TopNavBar;
