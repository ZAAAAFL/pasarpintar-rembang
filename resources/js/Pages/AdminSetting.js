import React from "react";
import Main from "@/Components/AdminTemplate/Main";

const AdminSetting = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Setting Admin</h1>
    </div>
  );
};

AdminSetting.layout = (page) => <Main children={page} />;

export default AdminSetting;
