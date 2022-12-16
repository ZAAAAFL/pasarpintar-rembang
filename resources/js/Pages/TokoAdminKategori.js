import React from "react";
import Main from "@/Components/TokoTemplate/Main";

const TokoAdminKategori = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Toko Admin Kategori</h1>
    </div>
  );
};

TokoAdminKategori.layout = (page) => <Main children={page} />;

export default TokoAdminKategori;
