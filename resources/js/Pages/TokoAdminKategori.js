import React from "react";
import Main from "@/Components/TokoTemplate/Main";

const TokoAdminKategori = () => {
  return (
    <>
      <div className="flex">
        <h1 className="font-bold text-3xl">Toko Kategori</h1>
        <a href="/toko-kategori/create" className="bg-blue-600 text-white hover:bg-blue-700 ml-5 p-2 rounded-md">Tambah Kategori</a>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Kategori
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                1
              </th>
              <td>Elektronik</td>
              <td>
                <a href={'/toko-kategori/1/edit'} className="bg-yellow-400 text-white rounded-md p-2 mx-1">Edit</a>
                <a href={'/hapus'} className="bg-red-500 text-white rounded-md p-2 mx-1">Hapus</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </>
  );
};

TokoAdminKategori.layout = (page) => <Main children={page} />;

export default TokoAdminKategori;
