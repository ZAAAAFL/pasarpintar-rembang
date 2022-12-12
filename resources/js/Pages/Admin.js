import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Components/AdminTemplate/Main";

const Admin = (props) => {
  return (
    <>
      <Head title={props.title} />
      <h1>Hello World</h1>
    </>
  );
};

Admin.layout = (page) => <Main children={page} />;

export default Admin;
