import React from 'react'
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";

export default function Main({ children }) {
  const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

  return (
    <>
      <NavBar appName={appName} />
      <div className="bg-slate-200">
        <div className="container py-3">
          {children}
        </div>
      </div>
      <Footer appName={appName} />
    </>
  );
}
