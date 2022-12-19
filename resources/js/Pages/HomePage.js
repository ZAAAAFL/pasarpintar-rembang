import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import Carousel from "@/Components/HomePage/Carousel";
import Kategori from "@/Components/HomePage/Kategori";
import ProdukLaris from "@/Components/HomePage/ProdukLaris";
import ProdukPromo from "@/Components/HomePage/ProdukPromo";
import ProdukAcak from "@/Components/HomePage/ProdukAcak";

const HomePage = ({ title, produk }) => {
  // console.log(produk);
  return (
    <div className="space-y-3">
      <Head title={title} />
      <Carousel />
      <Kategori />
      <ProdukLaris produk={produk.produkTerlaris} />
      <ProdukPromo />
      <ProdukAcak />
    </div>
  );
};

HomePage.layout = (page) => <Main children={page} />;

export default HomePage;
