import TokoMainBar from "@/Components/Toko/TokoMainBar";
import TokoProdukSemua from "@/Components/Toko/TokoProdukSemua";
import TokoProdukLaris from "@/Components/Toko/TokoProdukLaris";
import TokoProdukPromo from "@/Components/Toko/TokoProdukPromo";
import Main from "@/Layouts/Main";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

const Toko = ({ toko }) => {
  console.log(toko);
  return (
    <>
      <Head title={toko.namaToko} />
      <section className="overflow-hidden bg-white py-4 my-8">
        <div className="container space-y-3">
          <TokoMainBar toko={toko} />
          {/* <TokoProdukPromo /> */}
          <TokoProdukLaris />
          <TokoProdukSemua />
        </div>
      </section>
    </>
  );
};

Toko.layout = (page) => <Main children={page} />;

export default Toko;
