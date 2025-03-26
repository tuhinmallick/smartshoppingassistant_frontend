import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom"; // Import Outlet

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
