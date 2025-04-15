import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const BrandDetails = () => {
  const { brand } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await fetch(`/api/brands/${brand}`);
        const data = await response.json();
        setBrandDetails(data);
      } catch (err) {
        setError("Failed to load brand details");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandDetails();
  }, [brand]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!brandDetails) {
    return <div className="min-h-screen p-4">Brand not found</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Brand: {brandDetails.name}</h1>
      <p className="mb-8">{brandDetails.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandDetails.products.map((product) => (
          <div
            key={product.id}
            className="p-6 rounded-lg shadow-lg text-black hover:scale-105 transition bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <Link
              to={`/product/${product.id}`}
              className="mt-3 inline-block bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDetails;
