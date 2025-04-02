import React, { useState } from "react";
// Import your actual components
import UserProfile from "./UserProfile"; // Adjust the path as needed
import SavedProducts from "./SavedProducts"; // Adjust the path as needed
import PriceAlerts from "./PriceAlerts"; // Adjust the path as needed

const navLinks = [
  { name: "Dashboard", component: "🏠 Welcome to your Dashboard!" },
  { name: "Profile & Settings", component: <UserProfile /> },
  { name: "Saved Products", component: <SavedProducts /> },
  { name: "Price Alerts", component: <PriceAlerts /> },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [flipping, setFlipping] = useState(false);

  const handleTabChange = (tabName) => {
    if (tabName !== activeTab) {
      setFlipping(true);
      setTimeout(() => {
        setActiveTab(tabName);
        setFlipping(false);
      }, 600);
    }
  };

  return (
    <div className="mx-auto p-6 bg-[#fef6e4] shadow-xl shadow-gray-400 mt-6">
      {/* Navigation Tabs */}
      <div className="flex pb-3 mb-4">
        {navLinks.map((link, index) => (
          <button
            key={link.name}
            onClick={() => handleTabChange(link.name)}
            className={`block px-4 py-2 font-extrabold uppercase transition-all duration-300 ${
              activeTab === link.name
                ? "bg-[#2c2c2c] text-[#fff]"
                : `text-[#464646] hover:text-[#fff] hover:bg-[#fc372d] ${
                    index !== 0 ? "border-[#2c2c2c] border-l-2" : ""
                  }`
            }`}
          >
            {link.name}
          </button>
        ))}
      </div>

      {/* Conditional Rendering of Components with Smooth Fade Transition */}
      <div className="relative">
        {activeTab === "Dashboard" && (
          <div className="transition-opacity duration-500 ease-in-out opacity-100">
            {navLinks[0].component}
          </div>
        )}
        {activeTab === "Profile & Settings" && (
          <div className="transition-opacity duration-500 ease-in-out opacity-100">
            {navLinks[1].component}
          </div>
        )}
        {activeTab === "Saved Products" && (
          <div className="transition-opacity duration-500 ease-in-out opacity-100">
            {navLinks[2].component}
          </div>
        )}
        {activeTab === "Price Alerts" && (
          <div className="transition-opacity duration-500 ease-in-out opacity-100">
            {navLinks[3].component}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
