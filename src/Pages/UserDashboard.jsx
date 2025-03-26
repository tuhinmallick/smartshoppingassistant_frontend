import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        User Dashboard
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/profile"
          className="bg-blue-500 text-white p-4 rounded-lg text-center"
        >
          Profile & Settings
        </Link>
        <Link
          to="/saved-products"
          className="bg-green-500 text-white p-4 rounded-lg text-center"
        >
          Saved Products
        </Link>
        <Link
          to="/price-alerts"
          className="bg-yellow-500 text-white p-4 rounded-lg text-center"
        >
          Price Alerts
        </Link>
        <Link
          to="/notifications"
          className="bg-purple-500 text-white p-4 rounded-lg text-center"
        >
          Notifications
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
