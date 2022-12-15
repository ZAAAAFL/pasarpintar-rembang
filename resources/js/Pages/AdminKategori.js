import React from "react";
import Main from "@/Components/AdminTemplate/Main";

const AdminKategori = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Admin Kategori</h1>
    </div>
  );
};

AdminKategori.layout = (page) => <Main children={page} />;

export default AdminKategori;
