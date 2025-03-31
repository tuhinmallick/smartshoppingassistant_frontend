import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { fakePriceAlerts } from "../data/fakeData";

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(fakePriceAlerts);
  }, []);

  return (
    <section className="flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6">Pricing Alerts</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            className={`bg-white p-6 rounded-2xl shadow-lg w-72 text-center border-2 ${
              index === 2 ? "border-green-600 scale-105" : "border-gray-200"
            } transition-all duration-300 hover:shadow-xl`}
            whileHover={{ scale: 1.05 }}
          >
            {index === 2 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2">
                RECOMMENDED
              </span>
            )}
            <h6 className="text-lg font-extrabold text-gray-700">
              {alert.product}
            </h6>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {alert.alertPrice}
            </p>
            <p className="text-sm text-red-500 mt-1 line-through">
              {alert.currentPrice}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                {alert.status.toLowerCase() === "active" ? "✅ " : "❌ "}
                Status: {alert.status}
              </li>
            </ul>

            <Button
              text="To Offer"
              onClick={() => alert(`Subscribed to ${alert.product}`)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PriceAlerts;
