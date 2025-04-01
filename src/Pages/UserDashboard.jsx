import React, { useState, useEffect } from "react";

import SavedProducts from "./SavedProducts";
import PriceAlerts from "./PriceAlerts";
import UserProfile from "./UserProfile";

const navLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile & Settings", path: "/profile" },
  { name: "Saved Products", path: "/saved-products" },
  { name: "Price Alerts", path: "/price-alerts" },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userProfile, setUserProfile] = useState(null);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    fetch("./src/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.users && data.users.length > 0) {
          setUserProfile(data.users[0]);
          setSavedProducts(data.users[0].savedProducts);
        }
        setPriceAlerts(data.priceAlerts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <div className="flex space-x-4 border-b pb-3 mb-4">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => setActiveTab(link.name)}
            className={`block px-4 py-2 font-semibold ${
              activeTab === link.name
                ? "bg-gray-200 text-orange-500"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {link.name}
          </button>
        ))}
      </div>

      {activeTab === "Profile & Settings" && <UserProfile />}

      {activeTab === "Saved Products" && <SavedProducts />}

      {activeTab === "Price Alerts" && <PriceAlerts />}
    </div>
  );
};

export default UserDashboard;
