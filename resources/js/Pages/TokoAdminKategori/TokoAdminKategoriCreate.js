import React from "react";
import Main from "@/Components/TokoTemplate/Main";
import Input from "@/Components/Input";
import { Link } from "@inertiajs/inertia-react";

const TokoAdminKategoriCreate = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Tambah Kategori</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-2">
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
        <div>
          <label>Nama Kategori</label>
          <Input className="w-full" required={'required'} />
          <div>
            <Link href="/toko-kategori" className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md">Kembali</Link>
            <button className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md mt-2 ml-4">Tambah</button>
          </div>
        </div>
      </div>

    </>
  );
};

TokoAdminKategoriCreate.layout = (page) => <Main children={page} />;

export default TokoAdminKategoriCreate;
