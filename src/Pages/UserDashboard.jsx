import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
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

      {activeTab === "Profile & Settings" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">User Profile</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <img
              src={userProfile.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold">{userProfile.name}</h3>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-gray-500 mt-2">{userProfile.joined}</p>
            <p className="text-gray-500 mt-2">{userProfile.bio}</p>
          </div>
        </div>
      )}

      {activeTab === "Saved Products" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold">Saved Products</h2>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-lg font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Price Alerts" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Price Alerts</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Current Price</th>
                  <th className="py-2 px-4 text-left">Alert Price</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {priceAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b">
                    <td className="py-2 px-4">{alert.product}</td>
                    <td className="py-2 px-4">{alert.currentPrice}</td>
                    <td className="py-2 px-4">{alert.alertPrice}</td>
                    <td className="py-2 px-4">{alert.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
