import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import NavbarKurir from "@/Components/NavbarKurir";
import Input from "@/Components/Input";


export default function Kurir(props) {
  // console.log(props);
  return (
    <>
      <Head title="Kurir" />

      <NavbarKurir props={props} />
      <div className="m-5">
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama pemesan</label>
            <span className="font-bold">Ardianto Putra Pratomo</span>
            <hr></hr>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No handphone</label>
            <a href="tel:08888901970" className="font-bold">08888901970</a>
            <hr></hr>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat Pengiriman</label>
            <span className="font-bold">Selabaya</span>
            <hr></hr>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Metode Pembayaran</label>
            <span className="font-bold">Cash</span>
            <hr></hr>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data pesanan</label>
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6 rounded-l-lg">
                      Product name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Qty
                    </th>
                    <th scope="col" className="py-3 px-6 rounded-r-lg">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td className="py-4 px-6">
                      1
                    </td>
                    <td className="py-4 px-6">
                      $2999
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900 dark:text-white">
                    <th scope="row" className="py-3 px-6 text-base">Total</th>
                    <td className="py-3 px-6">3</td>
                    <td className="py-3 px-6">21,000</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="mb-4 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload bukti sampai</label>
            <Input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" required />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 2048px / 2mb).</p>
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Konfirmasi Sampai</button>
        </form>
      </div>
    </>
  );
}
