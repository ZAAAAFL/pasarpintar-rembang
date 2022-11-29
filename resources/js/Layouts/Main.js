import React from "react";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import { usePage } from "@inertiajs/inertia-react";

export default function Main({ children }) {
  const props = usePage().props;
  console.log(props);
  return (
    <>
      <header>
        <NavBar appName={props.app.name} user={props.auth.user} />
      </header>
      {children}
      <Footer appName={props.app.name} />
    </>
  );
}
