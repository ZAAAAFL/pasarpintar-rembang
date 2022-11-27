import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";

export default function Produk(props) {

  return (
    <Main>
      <Head title={props.title} />
      <div className="h-screen">
      </div>
    </Main>
  );
}
