import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import QtyButton from "../QtyButton";

const ProdukDetail = ({ produk, toko }) => {
  console.log(produk, toko);
  return (
    <div className="w-full px-4 md:w-[65%]">
      <div className="md:pl-2 h-full">
        <div className="mt-3">
          <span className="mb-2 text-slate-800 text-lg lg:text-3xl font-semibold line-clamp-3">
            {produk.namaProduk}
          </span>
          <div className="flex justify-start mb-4">
            <div className="flex items-center justify-center">
              <div className="text-sm text-slate-800 mr-1">
                {produk.terjual}
              </div>
              <div className="text-sm text-slate-600">Terjual</div>
            </div>
          </div>
          <div className="inline-block mb-2 text-2xl lg:text-3xl font-semibold text-slate-800">
            <span className="mr-2">Rp{produk.hrgJual}</span>
            {produk.diskon && (
              <span className="text-base font-normal text-slate-600 line-through">
                Rp{produk.diskon}
              </span>
            )}
          </div>
          <div className="flex items-center mt-4 mb-5">
            <span className="mr-5 text-lg text-slate-900">Kuantitas</span>
            <QtyButton />
            <div className="ml-2">
              <span className="text-slate-900">Stok : </span>
              <span>{produk.stok}</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/2 lg:w-1/4">
              <button className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-sky-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-slate-900 focus:ring-4 focus:outline-none focus:ring-cyan-200">
                <span className="relative w-full px-5 py-2.5 text-base font-semibold transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  <span className="text-lg font-bold mr-1">+</span>Keranjang
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center px-2 my-6 py-4 border-y border-slate-200">
            <div className="flex flex-col pr-3">
              <span className="text-slate-800 mb-2 ml-2">{toko.namaToko}</span>
              <Link
                as="button"
                href={`/${toko.slug}`}
                className="inline-flex flex-row items-center text-slate-700 px-2 py-1 border border-slate-400 rounded-md hover:border-slate-900 hover:text-slate-900"
              >
                <BuildingStorefrontIcon className="w-4 h-5 mr-1" />
                Kunjungi Toko
              </Link>
            </div>
            <div className="flex pl-3">
              <div className="flex flex-col">
                <div className="relative flex mb-2">
                  <label className="mr-2 text-slate-700">Produk : </label>
                  <span className="text-slate-900">{toko.jumlahProduk}</span>
                </div>
                <div className="relative flex">
                  <label className="mr-2 text-slate-700">Bergabung : </label>
                  <span className="text-slate-900">{`${toko.lamaBergabung}`}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="flex border-b border-slate-200">
                <div className="p-4 pb-2  text-base font-bold border-b-2 border-sky-500">
                  Detail
                </div>
              </div>
            </div>
            <div className="mt-3 font-normal text-base">
              <div className="overflow-hidden">
                <div className="text-ellipsis whitespace-pre-wrap">
                  <p className="ml-2">{`${produk.deskripsi}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdukDetail;
