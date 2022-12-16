import React from "react";
import Main from "@/Components/TokoTemplate/Main";

const TokoAdminSetting = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Toko Admin Setting</h1>
    </div>
  );
};

TokoAdminSetting.layout = (page) => <Main children={page} />;

export default TokoAdminSetting;
