import React from "react";
import Main from "@/Components/TokoTemplate/Main";

const TokoAdmin = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Toko Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="w-full bg-blue-600 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Profit hari ini</div>
            <div>10</div>
          </div>
        </div>
        <div className="w-full bg-green-500 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Pesanan Baru</div>
            <div>10</div>
          </div>
        </div>
        <div className="w-full bg-yellow-400 text-black rounded-md">
          <div className="m-3 text-center">
            <div>Produk</div>
            <div>100</div>
          </div>
        </div>
        <div className="bg-red-500 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Kategori</div>
            <div>10</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Toko
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Software Store
                </th>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Akrilik Advertising
                </th>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a href={'/admin-toko'} className="text-blue-700 font-bold">Selengkapnya..</a>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Kategori Global
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Elektronik
                </th>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Aksesoris
                </th>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a href={'/admin-kategori'} className="text-blue-700 font-bold">Selengkapnya..</a>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

TokoAdmin.layout = (page) => <Main children={page} />;

export default TokoAdmin;
