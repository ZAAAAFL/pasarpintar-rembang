import React from "react";

import Input from "@/Components/Input";
import { Link } from "@inertiajs/inertia-react";
import Main from "@/Components/TokoTemplate/Main";

const KurirToko = () => {
  return (
    <>
      <div className="flex">
        <h1 className="font-bold text-3xl">Data Kurir</h1>
        <Link href="/toko-kurir/create" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md ml-5">Tambah Kurir</Link>
      </div>
      <div className="grid grid-cols-1">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama
                </th>
                <th scope="col" className="py-3 px-6">
                  Kontak
                </th>
                <th scope="col" className="py-3 px-6">
                  Alamat
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
                <td>Ardianto</td>
                <td>+62 888-8901-970</td>
                <td>Selabaya RT 2/5, Kalimanah, Purbalingga.</td>
                <td>
                  <a href={'/toko-kurir/1'} className="bg-blue-600 text-white rounded-md p-2 mx-1">Detail</a>
                  <a href={'/toko-kurir/1/edit'} className="bg-yellow-400 text-white rounded-md p-2 mx-1">Edit</a>
                  <a href={'/hapus'} className="bg-red-500 text-white rounded-md p-2 mx-1">Hapus</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div>
          <label>Nama Kurir</label>
          <Input className="w-full" required={'required'} />
          <div>
            <Link href="/toko-kategori" className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md">Kembali</Link>
            <button className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md mt-2 ml-4">Tambah</button>
          </div>
        </div> */}
      </div>

    </>

  );
};

KurirToko.layout = (page) => <Main children={page} />;

export default KurirToko;
