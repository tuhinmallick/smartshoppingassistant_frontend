import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      {/* Breadcrumb Component */}
      <Breadcrumb />

      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
