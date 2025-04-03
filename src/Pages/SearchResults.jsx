import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

const productsData = [
  {
    id: 1,
    name: "iPhone 13",
    brand: "Apple",
    image: "/images/iphone13.jpg",
    stores: [
      { name: "Store A", price: "$799", shipping: "$10", rating: 4.5 },
      { name: "Store B", price: "$789", shipping: "Free", rating: 4.2 },
      { name: "Store C", price: "$805", shipping: "$5", rating: 4.3 },
    ],
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    brand: "Samsung",
    image: "/images/galaxys22.jpg",
    stores: [
      { name: "Store A", price: "$899", shipping: "$15", rating: 4.3 },
      { name: "Store B", price: "$879", shipping: "$5", rating: 4.7 },
      { name: "Store C", price: "$890", shipping: "Free", rating: 4.6 },
    ],
  },
  {
    id: 3,
    name: "Google Pixel 7",
    brand: "Google",
    image: "/images/pixel7.jpg",
    stores: [
      { name: "Store A", price: "$699", shipping: "$10", rating: 4.6 },
      { name: "Store B", price: "$689", shipping: "Free", rating: 4.4 },
      { name: "Store C", price: "$695", shipping: "$5", rating: 4.5 },
    ],
  },

  // Add more products as needed
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("lowestPrice");

  useEffect(() => {
    // Filter products based on the query
    const filteredResults = productsData.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  }, [query]);

  const handleSort = (type) => {
    setSortBy(type);
    let sortedResults = [...results];
    if (type === "lowestPrice") {
      sortedResults.sort(
        (a, b) =>
          Math.min(...a.stores.map((s) => parseFloat(s.price.slice(1)))) -
          Math.min(...b.stores.map((s) => parseFloat(s.price.slice(1))))
      );
    } else if (type === "bestRating") {
      sortedResults.sort(
        (a, b) =>
          Math.max(...b.stores.map((s) => s.rating)) -
          Math.max(...a.stores.map((s) => s.rating))
      );
    }
    setResults(sortedResults);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-16 w-full">
      {/* Breadcrumb Navigation */}
      <nav className="text-m mb-6">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <span className="mx-2 text-gray-500">&gt;</span>
        <span className="text-gray-700">Search Results</span>
      </nav>
      {/* Search Header */}
      <h2 className="text-4xl font-bold mb-6 text-indigo-700">
        Search Results for "<span className="text-black">{query}</span>"
      </h2>
      {/* Filters & Sorting */}
      <div className="mb-8 flex flex-wrap gap-6 items-center">
        {/* Price Range Filter */}
        <div className="bg-orange-100 p-4 shadow rounded-lg">
          <label className="block text-xl font-medium text-red-900">
            Price Range
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="mt-2 w-full accent-blue-700"
          />
          <span className="ml-2 text-gray-800 font-medium">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        {/* Sorting Dropdown */}
        <div className="bg-orange-100 p-4 shadow rounded-lg">
          <label className="block text-xl font-medium text-green-900">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="mt-2 block w-full pl-3 pr-10 py-2 border border-gray-400 bg-teal-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="lowestPrice">Lowest Price</option>
            <option value="bestRating">Best Rating</option>
          </select>
        </div>
      </div>
      {/* Search Results */}
      <div className="space-y-6">
        {results.map((product) => (
          <div
            key={product.id}
            className="bg-blue-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition"
          >
            {/* Product Header */}
            <div className="flex items-center mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md shadow-md mr-6"
              />
              <div>
                <h3 className="text-2xl font-semibold text-red-800">
                  {product.name}
                </h3>
                <p style={{ color: '#6A0DAD' }} className="text-pink-900">{product.brand}</p>
              </div>
            </div>
            {/* Product Table */}
            <table
              className="w-full border-collapse"
              style={{ backgroundColor: '#E6E6FA' /* Beige color */ }}
            >
              <thead>
                <tr className="bg-orange-100 gradient-text text-left">
                  <th className="p-3">Store</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Shipping</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {product.stores.map((store, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 border-b border-gray-200"
                  >
                    <td className="p-3">{store.name}</td>
                    <td className="p-3 text-blue-600 font-bold">{store.price}</td>
                    <td className="p-3">{store.shipping}</td>
                    <td className="p-3">{store.rating} / 5</td>
                    <td className="p-3 text-center">
                      <div className="wavy-background">
                        <button className="relative overflow-hidden text-white px-6 py-3 rounded-lg transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400 before:via-green-500 before:to-green-600 before:animate-wavy hover:before:animate-wavy">
                          <span className="relative z-10">Buy Now</span>
                          <style jsx>{`
                            @keyframes wavy {
                              0% { background-position: 0% 50%; }
                              50% { background-position: 100% 50%; }
                              100% { background-position: 0% 50%; }
                            }
                            .before\\:animate-wavy::before {
                              content: "";
                              background-size: 300% 300%;
                              animation: wavy 3s ease-in-out infinite;
                            }
                          `}</style>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}