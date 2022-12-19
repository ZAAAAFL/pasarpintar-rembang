import React from "react";
import Main from "@/Components/TokoTemplate/Main";
import Input from "@/Components/Input";
import { Link } from "@inertiajs/inertia-react";

const KurirTokoEdit = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Edit Kurir</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>

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
            <Link href="/toko-kurir" className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md">Kembali</Link>
            <button className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md mt-2 ml-4">Update</button>
          </div>
        </div>
      </div>

    </>
  );
};

KurirTokoEdit.layout = (page) => <Main children={page} />;

export default KurirTokoEdit;
