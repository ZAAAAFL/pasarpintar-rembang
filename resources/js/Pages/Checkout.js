import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
// import HomePage from "./HomePage";

const Checkout = (props) => {
  return (
    <div className="space-y-3 space-x-5">
      <Head title={props.title} />

      <div>
        <div className="p-5 bg-white">{props.title}</div>
        <div className="m-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border-t-4 border-t-sky-600">
            <div className="ml-3">
              Nama pemesan: <br />
              <span className="text-gray-900 mx-auto">Ardianto Putra Pratomo (+62 888-8901-970)</span>
            </div>
            <div className="ml-3">
              Alamat pengiriman: <br />
              <textarea id="message" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis alamat" value="selabaya RT 2/5" />
              {/* <span>Edit alamat jika perlu</span> */}
              <div className="flex p-2 mt-1 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="text-sm">Edit alamat jika perlu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex m-3 bg-white border-b hover:bg-slate-100 my-2">
          <div className="m-2">
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className="w-20 h-20 rounded-md" />
          </div>
          <div className="m-2">
            <span className="mx-2">Laptop Acer</span><br></br>
            <div className="mx-2 text-sm">1 x 20.000 = Rp. 20.000</div>
            <div className="mx-2">
              <span className="text-xs">dari toko Softdev Community</span>
            </div>
          </div>
        </div>
        <div className="flex m-3 bg-white border-b hover:bg-slate-100 my-2">
          <div className="m-2">
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className="w-20 h-20 rounded-md" />
          </div>
          <div className="m-2">
            <span className="mx-2">Laptop Acer</span><br></br>
            <div className="mx-2 text-sm">1 x 20.000 = Rp. 20.000</div>
            <div className="mx-2">
              <span className="text-xs">dari toko Softdev Community</span>
            </div>
          </div>
        </div>
        <div className="flex m-3 bg-white border-b hover:bg-slate-100 my-2">
          <div className="m-2">
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className="w-20 h-20 rounded-md" />
          </div>
          <div className="m-2">
            <span className="mx-2">Laptop Acer</span><br></br>
            <div className="mx-2 text-sm">1 x 20.000 = Rp. 20.000</div>
            <div className="mx-2">
              <span className="text-xs">dari toko Softdev Community</span>
            </div>
          </div>
        </div>

        <div className="p-4 text-bold bg-white text-black grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mb-2 mx-auto md:mx-0">
            <div>Metode bayar</div>
            <select className="rounded-md">
              <option>- Pilih metode pembayaran -</option>
              <option>Transfer</option>
              <option>Bayar ditempat</option>
            </select>
          </div>
          <div className="md:text-end text-center">Total: Rp. 60.000</div>
        </div>
        <div className="mx-auto my-7 text-end mr-5">
          <Link className="bg-blue-600 text-white p-2 rounded-md text-center">Batal</Link>
          <Link className="bg-green-500 p-2 text-white rounded-md text-center">Pesan</Link>
        </div>
      </div>
    </div>
  );
};

Checkout.layout = (page) => <Main children={page} />;
// HomePage.layout = (page) => <Main children={page} />;

export default Checkout;
