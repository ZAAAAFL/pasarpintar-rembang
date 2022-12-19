import React from "react";
import Main from "@/Components/TokoTemplate/Main";
import Input from "@/Components/Input";
import { Link } from "@inertiajs/inertia-react";
import NavTabsPesananToko from "@/Components/NavTabsPesananToko";

const PesananBaru = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Pesanan Baru</h1>
      </div>
      <div>
        <NavTabsPesananToko />
      </div>

    </>
  );
};

PesananBaru.layout = (page) => <Main children={page} />;

export default PesananBaru;
