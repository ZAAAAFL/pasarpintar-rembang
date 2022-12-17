import React from "react";
import Main from "@/Components/AdminTemplate/Main";
import Input from "@/Components/Input";

const AdminKategori = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Tambah Toko</h1>
      </div>
      <div>
        ini tambah toko (admin)
      </div>

    </>

  );
};

AdminKategori.layout = (page) => <Main children={page} />;

export default AdminKategori;
