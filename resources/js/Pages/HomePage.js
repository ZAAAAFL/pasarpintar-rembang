import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import Carousel from "@/Components/HomePage/Carousel";
import Kategori from "@/Components/HomePage/Kategori";

const HomePage = (props) => {
  return (
    <div className="space-y-3">
      <Head title={props.title} />
      <Carousel/>
      <Kategori />
      <div className="h-screen"></div>
    </div>
  );
};

HomePage.layout = (page) => <Main children={page} />;

export default HomePage;
