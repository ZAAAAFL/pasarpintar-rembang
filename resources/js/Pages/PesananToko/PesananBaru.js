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

        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Product name
                </th>
                <th scope="col" class="py-3 px-6">
                  Color
                </th>
                <th scope="col" class="py-3 px-6">
                  Category
                </th>
                <th scope="col" class="py-3 px-6">
                  Price
                </th>
                <th scope="col" class="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </th>
                <td class="py-4 px-6">
                  Sliver
                </td>
                <td class="py-4 px-6">
                  Laptop
                </td>
                <td class="py-4 px-6">
                  $2999
                </td>
                <td class="py-4 px-6">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Microsoft Surface Pro
                </th>
                <td class="py-4 px-6">
                  White
                </td>
                <td class="py-4 px-6">
                  Laptop PC
                </td>
                <td class="py-4 px-6">
                  $1999
                </td>
                <td class="py-4 px-6">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Magic Mouse 2
                </th>
                <td class="py-4 px-6">
                  Black
                </td>
                <td class="py-4 px-6">
                  Accessories
                </td>
                <td class="py-4 px-6">
                  $99
                </td>
                <td class="py-4 px-6">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
