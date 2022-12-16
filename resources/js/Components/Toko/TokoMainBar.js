import {
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/20/solid";
import React from "react";

const TokoMainBar = ({ toko }) => {
  return (
    <div className="flex flex-row items-center p-4 my-4 border border-sky-300 rounded-md">
      <div className="flex items-center flex-nowrap">
        <BuildingStorefrontIcon className="w-20 h-20 text-cyan-500" />
        <div className="pl-3 flex flex-col">
          <span className="text-xl font-bold mb-2">{toko.namaToko}</span>
          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-300 to-sky-500 group-hover:from-cyan-300 group-hover:to-sky-500 focus:ring-4 focus:outline-none focus:ring-cyan-200">
            <span className="relative px-10 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              <div className="flex text-slate-700">
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-slate-500" />
                Chat WA Penjual
              </div>
            </span>
          </button>
        </div>
      </div>
      <div className="flex items-center ml-14">
        <div className="flex flex-col">
          <span className="">{`Nama Pengelola : ${toko.namaPengelola}`}</span>
          <span className="">{`Alamat : ${toko.alamat}`}</span>
        </div>
      </div>
    </div>
  );
};

export default TokoMainBar;
