import React from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProductDetails = () => {
  const { id } = useParams();
  
  // Dummy product data
  const products = {
    1: {
      name: "iPhone 13",
      brand: "Apple",
      price: "$799",
      desc: "A powerful phone with A15 Bionic chip.",
      image: "/images/iphone13.jpg",
      priceHistory: [
        { date: "2025-01-01", price: 850 },
        { date: "2025-02-01", price: 825 },
        { date: "2025-03-01", price: 799 },
      ],
      sellers: [
        { name: "TechStore", price: "$799", shipping: "Free", rating: 4.8 },
        { name: "MobileWorld", price: "$815", shipping: "$10", rating: 4.5 },
      ],
      reviews: [
        { user: "John", rating: 5, comment: "Excellent phone!" },
        { user: "Sarah", rating: 4, comment: "Good battery life" },
      ],
    },
    2: {
      name: "Samsung Galaxy S22",
      brand: "Samsung",
      price: "$899",
      desc: "Premium display with 120Hz refresh rate.",
      image: "/images/galaxy-s22.jpg",
      priceHistory: [
        { date: "2025-01-01", price: 950 },
        { date: "2025-02-01", price: 925 },
        { date: "2025-03-01", price: 899 },
      ],
      sellers: [
        { name: "TechStore", price: "$899", shipping: "Free", rating: 4.8 },
        { name: "MobileWorld", price: "$915", shipping: "$10", rating: 4.5 },
      ],
      reviews: [
        { user: "Alice", rating: 5, comment: "Great phone!" },
        { user: "Bob", rating: 4, comment: "Good performance" },
      ],
      similarProducts: [
        { id: 1, name: "iPhone 13", price: "$799", image: "/images/iphone13.jpg" },
      ]
    },
    3: {
      name: "Google Pixel 7",
      brand: "Google",
      price: "$699",
      desc: "Next-gen AI camera & pure Android experience.",
      image: "/images/pixel7.jpg",
      priceHistory: [
        { date: "2025-01-01", price: 750 },
        { date: "2025-02-01", price: 725 },
        { date: "2025-03-01", price: 699 },
      ],
      sellers: [
        { name: "TechStore", price: "$699", shipping: "Free", rating: 4.8 },
        { name: "MobileWorld", price: "$715", shipping: "$10", rating: 4.5 },
      ],
      reviews: [
        { user: "Charlie", rating: 5, comment: "Amazing camera!" },
        { user: "Diana", rating: 4, comment: "Smooth experience" },
      ],
      similarProducts: [
        { id: 1, name: "iPhone 13", price: "$799", image: "/images/iphone13.jpg" },
      ]
    },
  };

  const product = products[id];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-red-500">Product Not Found</h2>
          <p className="mt-2 text-gray-700">Sorry, this product does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-gray-300 p-8 mt-20">

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-8">
        {/* Product Info */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img src={product.image} alt={product.name} className="w-full h-96 object-contain rounded-lg shadow-md" />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-2xl text-gray-600 mt-2">{product.brand}</p>
            <p className="text-3xl text-blue-600 font-bold mt-4">{product.price}</p>
            <p className="mt-4 text-gray-700 text-lg">{product.desc}</p>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Buy Now</button>
              <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Add to Wishlist</button>
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Set Price Alert</button>
            </div>

            {/* Price History Chart */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Price History</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={product.priceHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#ff7300" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Available Sellers */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Available Sellers</h3>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Seller</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Shipping</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {product.sellers.map((seller, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">{seller.name}</td>
                  <td className="p-3 font-bold">{seller.price}</td>
                  <td className="p-3">{seller.shipping}</td>
                  <td className="p-3 text-yellow-500">
                    {"★".repeat(Math.round(seller.rating))}{"☆".repeat(5 - Math.round(seller.rating))}
                  </td>
                  <td className="p-3">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                      Buy from {seller.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer Reviews */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Customer Reviews</h3>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-800">{review.user}</span>
                  <div className="text-yellow-500">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
