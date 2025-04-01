import React, { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";
const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const response = await fetch("./src/data/data.json");
        const data = await response.json();
        setSavedProducts(data.users[0].savedProducts || []);
      } catch (error) {
        console.error("Error fetching saved products:", error);
      }
    };

    fetchSavedProducts();
  }, []);

  const handleSave = (product) => {
    console.log("Product saved:", product);
  };

  return (
    <div className="save-product text-center mt-6">
      <h2 className="text-3xl font-bold">Saved Products</h2>
      {savedProducts.length === 0 ? (
        <p className="text-gray-500 mt-4">No saved products.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6 mt-4 transition-all duration-300 hover:shadow-black">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSave={handleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProducts;
