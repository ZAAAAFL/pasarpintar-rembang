import React from "react";
import Main from "@/Components/TokoTemplate/Main";
import Input from "@/Components/Input";
import { Link } from "@inertiajs/inertia-react";
import NavTabsPesananToko from "@/Components/NavTabsPesananToko";

const PesananBaru = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Pesanan Baru</h1>
      </div>
      <div>
        <NavTabsPesananToko />

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  No. Faktur
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama pemesan
                </th>
                <th scope="col" className="py-3 px-6">
                  Status bayar
                </th>
                <th scope="col" className="py-3 px-6">
                  Status pesan
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  PS-20319313814
                </th>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Ardianto
                </th>
                <td className="py-4 px-6">
                  Transfer
                </td>
                <td className="py-4 px-6">
                  Menunggu persetujuan
                </td>
                <td className="py-4 px-6">
                  Selabaya RT 2/5, Kalimanah, Purbalingga.
                </td>
                <td className="py-4 px-6">
                  <Link href="#" className="font-medium bg-blue-500 text-white mx-1 p-2 rounded-md">Detail</Link>
                  <Link href="#" className="font-medium bg-green-400 text-white p-2 mx-1 rounded-md">Setuju</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </>
  );
};

PesananBaru.layout = (page) => <Main children={page} />;

export default PesananBaru;
