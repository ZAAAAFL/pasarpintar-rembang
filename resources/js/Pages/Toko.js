import TokoCarousel from "@/Components/Toko/TokoCarousel";
import TokoMainBar from "@/Components/Toko/TokoMainBar";
import TokoProdukAcak from "@/Components/Toko/TokoProdukAcak";
import TokoProdukLaris from "@/Components/Toko/TokoProdukLaris";
import TokoProdukPromo from "@/Components/Toko/TokoProdukPromo";
import Main from "@/Layouts/Main";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

const Toko = (props) => {
  return (
    <>
    <Head title={props.namaToko} />
      <TokoMainBar />
      <TokoCarousel />
      <TokoProdukPromo />
      <TokoProdukLaris />
      <TokoProdukAcak />
    </>
  );
};

Toko.layout = (page) => <Main children={page} />;

export default Toko;
