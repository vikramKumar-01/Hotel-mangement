// src/component/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Fixed */}
      <Navbar />

      {/* Main Content (pushes footer down) */}
      <main className="flex-grow pt-[64px]"> 
        {/* pt-[64px] = Navbar ki height ke barabar padding */}
        <Outlet />
      </main>

      {/* Footer Always at Bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
