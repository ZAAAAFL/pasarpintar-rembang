import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import ProdukImage from "@/Components/Produk/ProdukImage";
import ProdukDetail from "@/Components/Produk/ProdukDetail";

const Produk = ({produk, toko}) => {
  return (
    <>
      <Head title={produk.namaProduk} />
      <section className="overflow-hidden bg-white py-4 my-8">
        <div className="container">
          <div className="flex flex-wrap">
            <ProdukImage />
            <ProdukDetail produk={produk} toko={toko} />
          </div>
        </div>
      </section>
    </>
  );
};

Produk.layout = (page) => <Main children={page} />;

export default Produk;
