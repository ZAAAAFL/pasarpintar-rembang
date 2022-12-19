import React from "react";
import Main from "@/Components/TokoTemplate/Main";
import Input from "@/Components/Input";
import { Link } from "@inertiajs/inertia-react";

const KurirTokoCreate = () => {
  return (
    <>
      <div className="flex">
        <h1 className="font-bold text-3xl">Tambah Kategori</h1>
        <Link href="/toko-kurir" className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md ml-5">Kembali</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 className="text-lg mb-3 font-bold">Pilih dari customer</h1>
          <select className="w-full">
            <option>Pilih dari customer</option>
            <option>Ardianto</option>
          </select>
          <button className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md mt-2">Tambah</button>
        </div>
        <div>
          <h1 className="text-lg mb-3 font-bold">Tambah Kurir baru</h1>

          <div>
            <label>Nama Kurir</label>
            <Input className="w-full" required={'required'} />
          </div>
          <div>
            <label>Email</label>
            <Input className="w-full" required={'required'} />
          </div>
          <div>
            <label>Password</label>
            <Input className="w-full" required={'required'} />
          </div>
          <div>
            <label>No Hp</label>
            <Input className="w-full" required={'required'} />
          </div>
          <div>
            <label className="mb-2">Alamat</label>
            <textarea className="w-full rounded-md h-[100px]">...</textarea>
          </div>

          <div>
            <button className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md mt-2">Tambah</button>
          </div>
        </div>
      </div>

    </>
  );
};

KurirTokoCreate.layout = (page) => <Main children={page} />;

export default KurirTokoCreate;
