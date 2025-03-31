import React, { useState, useEffect } from "react";
import ProductCard from "../ui/ProductCard"; // Import the reusable card

const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    // Fetch data.json from the public folder
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
    // Logic for saving the product, e.g., adding to a favorites list
    console.log("Product saved:", product);
  };

  return (
    <div className="text-center mt-6 save-products">
      <h2 className="text-3xl font-bold">Saved Products</h2>
      {savedProducts.length === 0 ? (
        <p className="text-gray-500 mt-4">No saved products.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSave={handleSave} // Pass the save handler as a prop
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProducts;
