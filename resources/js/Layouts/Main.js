import React from "react";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import { usePage } from "@inertiajs/inertia-react";

export default function Main({ children }) {
  const { app } = usePage().props;

  return (
    <>
      <header>
        <NavBar appName={app.name} />
      </header>
      {children}
      <Footer appName={app.name} />
    </>
  );
}
