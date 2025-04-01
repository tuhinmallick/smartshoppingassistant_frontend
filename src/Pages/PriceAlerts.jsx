import React, { useState, useEffect } from "react";
import { fakePriceAlerts } from "../data/fakeData";
import Button from "../components/ui/Button";

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(fakePriceAlerts);
  }, []);

  return (
    <section className="items-center p-8">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">
        Pricing Alerts
      </h2>
      <div className="grid grid-cols-3 gap-6 justify-center">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="relative border-4 border-gray-100 text-center p-6 bg-white w-72 rounded-lg shadow-lg 
            hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {/* Top Banner (Dynamic Width) */}
            <div
              className="absolute top-[-10px] right-0 flex justify-center h-16 items-center min-w-max px-4 py-1 text-white font-bold text-lg bg-no-repeat"
              style={{
                backgroundImage: "url('/src/assets/alert.png')",
                backgroundSize: "100% 100%",
              }}
            >
              <p className="text-white text-xl">{alert.alertPrice}</p>
            </div>

            {/* Product Name */}
            <h3 className="text-xl font-semibold text-gray-700 py-8">
              {alert.product}
            </h3>

            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={alert.image}
                alt={alert.product}
                className="w-24 h-24 object-cover rounded-md shadow-sm"
              />
            </div>

            <p className="text-red-600 text-md font-bold mt-2 line-through">
              {alert.currentPrice}
            </p>

            {/* Status */}
            <ul className="mt-2 space-y-2 text-md text-gray-600">
              <li>
                {alert.status.toLowerCase() === "active" ? "✅ " : "❌ "}
                Status: {alert.status}
              </li>
            </ul>

            {/* Sign-Up Button */}
            <Button
              text="To Offer"
              onClick={() => alert(`Subscribed to ${alert.product}`)}
              className="mt-4"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceAlerts;
