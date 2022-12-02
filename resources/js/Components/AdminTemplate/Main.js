import React from "react";
import Sidebar from "@/Components/AdminTemplate/template/Sidebar";
import { usePage } from "@inertiajs/inertia-react";

export default function Main({ children }) {
  const props = usePage().props;
  console.log(props);
  return (
    <>
      <header>
        <Sidebar appName={props.app.name} user={props.auth.user} />
      </header>
      {children}
    </>
  );
}
