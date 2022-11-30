import {
  CreditCardIcon,
  HandThumbUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";
import React from "react";

const Kategori = () => {
  return (
    <>
      <div className="container">
        <div className="bg-white hidden sm:grid sm:grid-cols-3 sm:gap-2 sm:mx-auto sm:max-w-lg">
          <div className="h-14 py-1 px-2 border-2 border-slate-900 rounded-lg">
            <div className="flex justify-center items-center">
              <CreditCardIcon className="h5 w-5" />
            </div>
          </div>
          <div className="bg-white h-14 py-1 px-2 border-2 border-slate-900 rounded-lg">
            <div className="flex justify-center items-center">
              <ShieldCheckIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="bg-white h-14 py-1 px-2 border-2 border-slate-900 rounded-lg">
            <div className="flex justify-center items-center">
              <HandThumbUpIcon className="h5 w-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-2">
        <div className="container">
          <div className="grid grid-cols-4 gap-2 mx-2 sm:mx-0">
            <div className="h-14 bg-sky-500"></div>
            <div className="h-14 bg-sky-500"></div>
            <div className="h-14 bg-sky-500"></div>
            <div className="h-14 bg-sky-500"></div>
            <div className="h-14 bg-sky-500"></div>
            <div className="h-14 bg-sky-500"></div>
            <div className="h-14 bg-sky-500"></div>
            <div className="h-14 bg-sky-500"></div>
            <div className="h-14 bg-sky-500"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kategori;
