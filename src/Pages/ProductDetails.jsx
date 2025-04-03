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
    },
    4: {
      name: "OnePlus 11",
      brand: "OnePlus",
      price: "$699",
      desc: "Flagship phone with Snapdragon 8 Gen 2 & Hasselblad camera.",
      image: "/images/oneplus11.jpg",
      priceHistory: [
        { date: "2025-01-01", price: 750 },
        { date: "2025-02-01", price: 725 },
        { date: "2025-03-01", price: 699 },
      ],
      sellers: [
        { name: "OnePlus Store", price: "$699", shipping: "Free", rating: 4.9 },
        { name: "Tech Hub", price: "$719", shipping: "$5", rating: 4.6 },
      ],
      reviews: [
        { user: "Ethan", rating: 5, comment: "Super smooth and fast!" },
        { user: "Olivia", rating: 4, comment: "Love the camera!" },
      ],
    },
    5: {
      name: "OnePlus Buds Pro 2",
      brand: "OnePlus",
      price: "$149",
      desc: "Premium wireless earbuds with ANC & superior sound.",
      image: "/images/oneplusbuds.jpg",
      priceHistory: [
        { date: "2025-01-01", price: 159 },
        { date: "2025-02-01", price: 155 },
        { date: "2025-03-01", price: 149 },
      ],
      sellers: [
        { name: "OnePlus Store", price: "$149", shipping: "Free", rating: 4.7 },
        { name: "GadgetWorld", price: "$155", shipping: "$5", rating: 4.5 },
      ],
      reviews: [
        { user: "Sophia", rating: 5, comment: "Amazing sound quality!" },
        { user: "Liam", rating: 4, comment: "Comfortable for long use." },
      ],
    },
  };
  
  const product = products[id];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
  <div className="text-center p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-3xl font-bold text-red-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
      Product Not Found
    </h2>
    <p className="mt-2 text-gray-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
      Sorry, this product does not exist.
    </p>
  </div>
</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 to-gray-400 p-8 mt-20">
  <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-8">
    {/* Product Info */}
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <img src={product.image} alt={product.name} className="w-full h-96 object-contain rounded-lg shadow-md" />
      </div>
      <div className="w-full md:w-2/3">
        <h1 className="text-5xl font-extrabold text-green-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {product.name}
        </h1>
        <p className="text-2xl text-gray-700 mt-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {product.brand}
        </p>
        <p className="text-4xl text-pink-700 font-bold mt-4">{product.price}</p>
        <p className="mt-4 text-gray-700 text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {product.desc}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
        <button className="wave-button buy px-6 py-3 bg-blue-600 text-white rounded-lg transition text-lg font-semibold relative overflow-hidden">
  <span>Buy Now</span>
</button>

<button className="wave-button wishlist px-6 py-3 bg-red-500 text-white rounded-lg transition text-lg font-semibold relative overflow-hidden">
  <span>Add to Wishlist</span>
</button>

<button className="wave-button alert px-6 py-3 bg-green-500 text-white rounded-lg transition text-lg font-semibold relative overflow-hidden">
  <span>Set Price Alert</span>
</button>
        </div>

        {/* Price History Chart */}
        <div className="mt-8">
          <h3 className="text-3xl font-bold mb-4 text-blue-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Price History
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={product.priceHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ccc" }} />
          <Legend wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }} />
          <Line type="monotone" dataKey="price" stroke="url(#colorPrice)" strokeWidth={3} activeDot={{ r: 8 }} />
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff7300" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Available Sellers */}
    <div className="mt-8">
      <h3 className="text-3xl font-bold mb-4 text-red-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Available Sellers
      </h3>
      <table className="w-full border-collapse bg-teal-100 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-300">
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
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition wavy-button">
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
      <h3 className="text-3xl font-bold mb-4 text-teal-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Customer Reviews
      </h3>
      <div className="space-y-4">
        {product.reviews.map((review, index) => (
          <div key={index} className="bg-blue-100 p-4 rounded-lg shadow">
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
