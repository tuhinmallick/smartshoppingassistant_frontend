import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // <- make sure this is here!
import { fetchLiveProductData } from "../api/authAPI";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const decodedQuery = decodeURIComponent(query).trim();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!decodedQuery || decodedQuery.toLowerCase() === "undefined") {
        console.warn("Query is empty or undefined — skipping fetch.");
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetchLiveProductData(decodedQuery);
        const products = Array.isArray(response?.products)
          ? response.products
          : response
          ? [response]
          : [];

        setResults(products);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [decodedQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 mt-16 w-full">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Search Results</h1>

      {results.length === 0 ? (
        <p className="text-xl text-gray-700">
          No products found for "{decodedQuery}".
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((product) =>
            product.Prices?.map((price) => (
              <div
                key={price.id}
                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
              >
                <img
                  src={price.mainImgUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <h3 className="mt-4 text-xl font-semibold text-blue-700">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {price?.SellerStore?.Seller?.name || "Unknown Seller"}
                </p>
                <p className="mt-2 text-lg font-bold text-red-600">
                  {price.price} {price.currency}
                </p>
                <a
                  href={price.product_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Product
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
