import React, { useState, useEffect } from "react";
import { fakePriceAlerts } from "../data/fakeData";
import { ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(fakePriceAlerts);
  }, []);

  const alertPrices = alerts.map((alert) => {
    console.log(`Raw Alert Price for ${alert.product}:`, alert.alertPrice);

    let priceStr = alert.alertPrice
      ?.toString()
      .replace(/[^\d.-]/g, "")
      .trim();
    console.log(`Cleaned Price String for ${alert.product}:`, priceStr);

    if (!priceStr || isNaN(parseFloat(priceStr))) {
      console.warn(`Invalid price for ${alert.product}, setting to Infinity`);
      return Infinity;
    }

    let price = parseFloat(priceStr);
    console.log(`Converted Price for ${alert.product}:`, price);
    return price;
  });

  const lowestPrice =
    alerts.length > 0
      ? Math.min(
          ...alerts.map((alert) => {
            let priceStr = alert.alertPrice
              ?.toString()
              .replace(/[^\d.-]/g, "")
              .trim();
            let price = parseFloat(priceStr);

            if (isNaN(price)) {
              console.warn(
                `Invalid price for ${alert.product}, setting to Infinity`
              );
              return Infinity;
            }

            return price;
          })
        )
      : null;

  console.log("Final Lowest Price:", lowestPrice);

  return (
    <section className="text-center pt-4">
      <h2 className="text-3xl font-extrabold uppercase text-[#fc372d] mb-2">
        Pricing Alerts
      </h2>
      <p className="text-[#464646] font-semibold mb-6">
        🔔 Track price alerts here.
      </p>

      <div className="grid grid-cols-4 gap-6 justify-center">
        {alerts.map((alert) => {
          let priceStr = alert.alertPrice
            ?.toString()
            .replace(/[^\d.-]/g, "")
            .trim();
          let price = parseFloat(priceStr);

          console.log(
            `Checking ${alert.product} → Alert Price: ${price}, Lowest Price: ${lowestPrice}`
          );

          return (
            <div
              key={alert.id}
              className={`relative border-2 text-center p-6 bg-white w-auto shadow-lg 
              hover:shadow-2xl hover:shadow-black transition-all duration-300 ease-in-out ${
                price === lowestPrice
                  ? "border-[#2C2C2C] shadow-2xl shadow-black"
                  : "border-[#2C2C2C]"
              }`}
            >
              {/* Top Banner  */}
              <div
                className="absolute top-[-10px] right-0 flex justify-center h-16 items-center min-w-max px-4 py-1 text-white font-bold text-lg bg-no-repeat"
                style={{
                  backgroundImage: "url('/src/assets/alert.png')",
                  backgroundSize: "100% 100%",
                }}
              >
                <p className="text-white text-xl">{alert.alertPrice}</p>
              </div>

              {/* Recommended Badge if this is the lowest price */}
              {price === lowestPrice && (
                <span className="bg-[#fc372d] text-white text-xs px-2 py-1 absolute top-0 left-0">
                  RECOMMENDED
                </span>
              )}

              {/* Product Details */}
              <h3 className="text-xl font-extrabold text-[#464646] py-8">
                {alert.product}
              </h3>
              <div className="flex justify-center">
                <img
                  src={alert.image}
                  alt={alert.product}
                  className="w-24 h-24 object-cover rounded-md shadow-sm"
                />
              </div>
              <p className="text-[#fc372d] text-sm font-bold mt-2 line-through">
                {alert.currentPrice}
              </p>

              <ul className="mt-2 space-y-2 text-sm font-bold uppercase text-[#464646]">
                <li>
                  {alert.status.toLowerCase() === "active" ? "✅ " : "❌ "}{" "}
                  {alert.status}
                </li>
              </ul>

              <Button
                text="To Offer"
                onClick={() => alert("Redirecting to offer")}
                icon={<ArrowRight className="w-5 h-5" />}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PriceAlerts;
