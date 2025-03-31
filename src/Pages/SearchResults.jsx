import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const initialResults = [
    {
      id: 1,
      name: "iPhone 13",
      brand: "Apple",
      image: "/images/iphone13.jpg",
      stores: [
        { name: "Store A", price: "$799", shipping: "$10", rating: 4.5 },
        { name: "Store B", price: "$789", shipping: "Free", rating: 4.2 },
      ],
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      brand: "Samsung",
      image: "/images/galaxys22.jpg",
      stores: [
        { name: "Store A", price: "$899", shipping: "$15", rating: 4.3 },
        { name: "Store C", price: "$879", shipping: "$5", rating: 4.7 },
      ],
    },
  ];

  const [results, setResults] = useState(initialResults);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("lowestPrice");

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
      <nav className="text-sm mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2 text-gray-500">&gt;</span>
        <span className="text-gray-600">Search Results</span>
      </nav>

      {/* Search Header */}
      <h2 className="text-4xl font-bold mb-6 text-indigo-700">
        Search Results for "<span className="text-black">{query}</span>"
      </h2>

      {/* Filters & Sorting */}
      <div className="mb-8 flex flex-wrap gap-6 items-center">
        {/* Price Range Filter */}
        <div className="bg-white p-4 shadow rounded-lg">
          <label className="block text-sm font-medium text-gray-700">
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
            className="mt-2 w-full accent-blue-500"
          />
          <span className="ml-2 text-gray-800 font-medium">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="bg-white p-4 shadow rounded-lg">
          <label className="block text-sm font-medium text-gray-700">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="mt-2 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition"
          >
            {/* Product Header */}
            <div className="flex items-center mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md shadow-md mr-6"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.brand}</p>
              </div>
            </div>

            {/* Product Table */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
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
                    <td className="p-3 text-blue-600 font-bold">
                      {store.price}
                    </td>
                    <td className="p-3">{store.shipping}</td>
                    <td className="p-3">{store.rating} / 5</td>
                    <td className="p-3 text-center">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        Buy Now
                      </button>
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