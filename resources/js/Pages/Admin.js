import React from "react";
import Main from "@/Components/AdminTemplate/Main";

const Admin = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Dashboard Admin</h1>
    </div>
  );
};

Admin.layout = (page) => <Main children={page} />;

export default Admin;
