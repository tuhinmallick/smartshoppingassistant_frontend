import React from "react";
import Sidebar from "../components/Sidebar"; // Adjust the path as necessary

export default function Homepage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 pt-8 px-8">
        <h1 className="text-3xl font-bold">
          Welcome to Smart Shopping Assistant!
        </h1>
      </div>
    </div>
  );
}
