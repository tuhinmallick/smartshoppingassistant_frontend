import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Chatbot from "../components/Chatbot";
const MainLayout = () => {
  return (
    <>
      <Navbar />

      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Outlet />
      </main>

      <div className="bg-transparent p-4">
        <Breadcrumb />
      </div>
      <Footer />
      <Chatbot /> {/* Add Tidio Chatbot */}
    </>
  );
};

export default MainLayout;
