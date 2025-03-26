import React, { useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "iPhone 13",
      brand: "Apple",
      price: "$799",
      image: "/images/iphone13.jpg",
      priceHistory: [
        { date: "2024-01-01", price: 850 },
        { date: "2024-02-01", price: 820 },
        { date: "2024-03-01", price: 799 },
      ],
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      brand: "Samsung",
      price: "$899",
      image: "/images/galaxy-s22.jpg",
      priceHistory: [
        { date: "2024-01-01", price: 950 },
        { date: "2024-02-01", price: 920 },
        { date: "2024-03-01", price: 899 },
      ],
    },
  ]);

  const [priceAlerts, setPriceAlerts] = useState({});

  const handleSetPriceAlert = (productId, targetPrice) => {
    setPriceAlerts((prevAlerts) => ({
      ...prevAlerts,
      [productId]: {
        targetPrice: parseFloat(targetPrice),
        enabled: true,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-bold">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-600 mt-4">Your wishlist is empty.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-gray-100 rounded-lg shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.brand}</p>
              <p className="text-blue-600 font-bold">
                Current Price: {product.price}
              </p>
              <div className="mt-2">
                <h4 className="text-lg font-semibold">Price History:</h4>
                <ul>
                  {product.priceHistory.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item.date}: ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Set Price Drop Alert:</h4>
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="Enter target price"
                    className="p-2 border rounded mr-2 text-gray-700"
                    onChange={(e) =>
                      handleSetPriceAlert(product.id, e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}