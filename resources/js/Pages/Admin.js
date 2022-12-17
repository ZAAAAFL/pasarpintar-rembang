import React from "react";
import Main from "@/Components/AdminTemplate/Main";

const Admin = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Dashboard Admin</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="w-full bg-blue-600 text-white rounded-md">
          <div className="m-3">Jumlah Toko</div>
        </div>
        <div className="w-full bg-green-500 text-white rounded-md">
          <div className="m-3">Jumlah CUstomer</div>
        </div>
        <div className="w-full bg-yellow-400 text-black rounded-md">
          <div className="m-3">Jumlah Produk</div>
        </div>
        <div className="bg-red-500 text-white rounded-md">
          <div className="m-3">Jumlah Kategori global</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-8">
        <div className="w-full bg-white shadow-md">
          grafik
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

Admin.layout = (page) => <Main children={page} />;

export default Admin;
