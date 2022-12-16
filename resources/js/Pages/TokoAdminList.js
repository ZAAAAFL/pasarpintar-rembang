import React from "react";
import Main from "@/Components/TokoTemplate/Main";

const TokoAdminList = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Toko Admin List</h1>
    </div>
  );
};

TokoAdminList.layout = (page) => <Main children={page} />;

export default TokoAdminList;
