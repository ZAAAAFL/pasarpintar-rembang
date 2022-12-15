import React from "react";
import Main from "@/Components/AdminTemplate/Main";

const AdminToko = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Admin Toko</h1>
    </div>
  );
};

AdminToko.layout = (page) => <Main children={page} />;

export default AdminToko;
