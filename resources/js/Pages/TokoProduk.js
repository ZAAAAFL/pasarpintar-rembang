import React from "react";
import Main from "@/Components/TokoTemplate/Main";

const TokoProduk = () => {
  return (
    <>
      <div className="flex">
        <h1 className="font-bold text-3xl">Toko Admin List</h1>
        <a href={'/toko-list/create'} className="ml-3 rounded-md bg-blue-600 text-white p-2 hover:bg-blue-700">Tambah Produk</a>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Nama Produk
              </th>
              <th scope="col" className="py-3 px-6">
                Stok Gudang
              </th>
              <th scope="col" className="py-3 px-6">
                Stok Toko
              </th>
              <th scope="col" className="py-3 px-6">
                Terjual
              </th>
              <th scope="col" className="py-3 px-6">
                Satuan Jual
              </th>
              <th scope="col" className="py-3 px-6">
                Harga Jual
              </th>
              <th scope="col" className="py-3 px-6">
                Harga Beli
              </th>
              <th scope="col" className="py-3 px-6" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                1
              </th>
              <td>Wafer</td>
              <td>10</td>
              <td>10</td>
              <td>15</td>
              <td>pcs</td>
              <td>10.000</td>
              <td>8.000</td>
              <td>
                <a href={'/toko-list/1/edit'} className="bg-yellow-400 mx-1 text-black p-2 rounded-md">Edit</a>
                <a href="#" className="bg-red-600 text-white mx-1 p-2 rounded-md">Hapus</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </>
  );
};

TokoProduk.layout = (page) => <Main children={page} />;

export default TokoProduk;
