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
      setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
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
    <section className="text-center pt-4 min-h-[60vh]">
      <h2 className="text-5xl font-extrabold uppercase text-[#fc372d] mb-2">
        Pricing Alerts
      </h2>
      <p className="text-[#464646] font-semibold text-xl mb-6">
        🔔 Track price alerts here.
      </p>

      {loading ? (
        <p className="text-lg font-semibold">Loading...</p>
      ) : alerts.length === 0 ? (
        <p className="text-gray-500 text-lg font-semibold">
          You haven’t saved any price alerts yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="relative border-2 itext-center p-6 bg-white shadow-xl shadow-black"
            >
              {/* Product Name */}
              <h3 className="text-2xl font-extrabold uppercase text-[#464646] py-4">
                {alert.Product?.name || "Unknown Product"}
              </h3>

              <ul className="mt-4 space-y-1 text-sm font-bold capitalize text-[#464646]">
                {/* Threshold */}
                <li>
                  🔔 Threshold: {alert.threshold} {alert.currency || "€"}
                </li>

                {/* Storage */}
                <li>💾 Storage: {alert.storage_gb} GB</li>

                {/* RAM */}
                {alert.ram_gb && <li>⚙️ RAM: {alert.ram_gb} GB</li>}

                {/* Color */}
                {alert.color && <li>🎨 Color: {alert.color}</li>}

                {/* Status */}
                <li>
                  {alert.status?.toLowerCase() === "active"
                    ? "✅ In Stock"
                    : "❌ Out of Stock"}
                </li>
              </ul>

              <div className="mt-6">
                <Button
                  text="Delete Alert"
                  onClick={() => handleDelete(alert.id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PriceAlerts;
