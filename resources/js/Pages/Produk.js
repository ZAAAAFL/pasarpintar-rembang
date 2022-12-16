import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import ProdukImage from "@/Components/Produk/ProdukImage";
import ProdukDetail from "@/Components/Produk/ProdukDetail";

const Produk = (props) => {
  console.log(props);
  return (
    <>
      <Head title={props.namaProduk} />
      <section className="overflow-hidden bg-white py-4 my-8">
        <div className="container">
          <div className="flex flex-wrap">
            <ProdukImage />
            <ProdukDetail />
          </div>
        </div>
      </section>
    </>
  );
};

Produk.layout = (page) => <Main children={page} />;

export default Produk;
