import React from "react";
import Main from "@/Components/TokoTemplate/Main";

const TokoAdmin = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Toko Dashboard</h1>
    </div>
  );
};

TokoAdmin.layout = (page) => <Main children={page} />;

export default TokoAdmin;
