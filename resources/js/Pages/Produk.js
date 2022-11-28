import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";

const Produk = (props) => {
  return (
    <>
      <Head title={props.title} />
      <div className="h-screen"></div>;
    </>
  );
};

Produk.layout = (page) => <Main children={page} />;

export default Produk;
