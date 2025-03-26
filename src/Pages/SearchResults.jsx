import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  // Dummy data
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
      sortedResults.sort((a, b) => 
        Math.min(...a.stores.map(s => parseFloat(s.price.slice(1)))) - 
        Math.min(...b.stores.map(s => parseFloat(s.price.slice(1))))
      );
    } else if (type === "bestRating") {
      sortedResults.sort((a, b) => 
        Math.max(...b.stores.map(s => s.rating)) - 
        Math.max(...a.stores.map(s => s.rating))
      );
    }
    setResults(sortedResults);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm mb-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2">&gt;</span>
        <span>Search Results</span>
      </nav>

      <h2 className="text-3xl font-bold mb-4">Search Results for "{query}"</h2>

      {/* Filters & Sorting */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="mt-1"
          />
          <span className="ml-2">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="lowestPrice">Lowest Price</option>
            <option value="bestRating">Best Rating</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-8">
        {results.map((product) => (
          <div key={product.id} className="bg-gray-100 rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-700">{product.brand}</p>
              </div>
            </div>

            {/* Comparison Table */}
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Store Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Shipping Cost</th>
                  <th className="p-2">Seller Rating</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {product.stores.map((store, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{store.name}</td>
                    <td className="p-2 font-bold text-blue-600">{store.price}</td>
                    <td className="p-2">{store.shipping}</td>
                    <td className="p-2">{store.rating} / 5</td>
                    <td className="p-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
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