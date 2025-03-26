import React from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

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
      similarProducts: [
        { id: 2, name: "Galaxy S22", price: "$899", image: "/images/galaxy-s22.jpg" },
      ]
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500">Product Not Found</h2>
          <p className="mt-2 text-gray-700">Sorry, the product you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl text-gray-600 mt-2">{product.brand}</p>
            <p className="text-3xl text-blue-600 font-bold mt-4">{product.price}</p>
            <p className="mt-4 text-gray-700 text-lg">{product.desc}</p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              <button className="px-6 py-3 rounded-lg transition bg-red-500 text-white hover:bg-red-600">
                Add to Wishlist
              </button>
              <button className="px-6 py-3 rounded-lg transition bg-green-500 text-white hover:bg-green-600">
                Set Price Alert
              </button>
            </div>
            {/* Price History Chart */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Price History</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={product.priceHistory}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        {/* Sellers Comparison Table */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Available Sellers</h3>
          <table className="w-full border-collapse">
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
                <tr key={index} className="border-b">
                  <td className="p-3">{seller.name}</td>
                  <td className="p-3 font-bold">{seller.price}</td>
                  <td className="p-3">{seller.shipping}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <span
                            key={i}
                            className={`fas fa-star ${i < seller.rating ? 'text-yellow-400' : 'text-gray-400'
                              }`}
                          ></span>
                        ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                      Buy from {seller.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold">{review.user}</span>
                  {/* Star Rating Display */}
                  <div className="flex text-yellow-400">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <span
                          key={i}
                          className={`fas fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'
                            }`}
                        ></span>
                      ))}
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