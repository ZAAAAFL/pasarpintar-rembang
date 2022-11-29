import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";

const HomePage = (props) => {
  return (
    <>
      <Head title={props.title} />
      <div className="h-screen"></div>;
    </>
  );
};

HomePage.layout = (page) => <Main children={page} />;

export default HomePage;
