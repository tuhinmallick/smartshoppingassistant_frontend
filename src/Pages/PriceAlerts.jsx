import React, { useState } from "react";

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([
    "iPhone 13 - $699",
    "Samsung TV - $499",
  ]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Price Alerts</h2>
      {alerts.length === 0 ? (
        <p>No price alerts set.</p>
      ) : (
        <ul className="list-disc pl-5">
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriceAlerts;
