import React, { useState, useEffect } from "react";
import { fetchPriceAlerts, deletePriceAlert } from "../api/authAPI";
import Button from "../components/ui/Button";

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await fetchPriceAlerts();
      setAlerts(data || []);
    } catch (error) {
      console.error("Failed to fetch price alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (alertId) => {
    setLoading(true);
    try {
      await deletePriceAlert(alertId);
      setAlerts(alerts.filter((alert) => alert.id !== alertId)); // Remove deleted alert from the list
    } catch (error) {
      console.error("Error deleting price alert:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <section className="text-center pt-4">
      <h2 className="text-5xl font-extrabold uppercase text-[#fc372d] mb-2">
        Pricing Alerts
      </h2>
      <p className="text-[#464646] font-semibold text-xl mb-6">
        🔔 Track price alerts here.
      </p>

      {loading && <p>Loading...</p>}

      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-6 justify-center">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="relative border-2 text-center my-4 p-6 bg-white w-auto shadow-lg"
          >
            <h3 className="text-xl font-extrabold text-[#464646] py-8">
              {alert.product}
            </h3>

            <p className="text-[#fc372d] text-sm font-bold mt-2 line-through">
              {alert.currentPrice}
            </p>

            <ul className="mt-4 space-y-1 text-sm font-bold uppercase text-[#464646]">
              <li>🔔 Threshold: €{alert.threshold}</li>
              <li>💾 Storage: {alert.storage_gb} GB</li>
              {alert.ram_gb && <li>⚙️ RAM: {alert.ram_gb} GB</li>}
              {alert.color && <li>🎨 Color: {alert.color}</li>}
              <li>
                {alert.status.toLowerCase() === "active" ? "✅" : "❌"}{" "}
                {alert.status}
              </li>
            </ul>

            <Button
              text="Delete Alert"
              onClick={() => handleDelete(alert.id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceAlerts;
