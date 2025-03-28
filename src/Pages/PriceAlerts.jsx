import React, { useState, useEffect } from "react";
import { fakePriceAlerts } from "../data/fakeData";

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(fakePriceAlerts);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Price Alerts</h2>
      {alerts.length === 0 ? (
        <p>No price alerts set.</p>
      ) : (
        <ul className="list-disc pl-5">
          {alerts.map((alert) => (
            <li key={alert.id}>
              <strong>{alert.product}</strong> - Current Price:{" "}
              {alert.currentPrice} - Alert Price: {alert.alertPrice} - Status:{" "}
              {alert.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriceAlerts;
