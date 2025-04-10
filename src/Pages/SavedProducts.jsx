import React, { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";

const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState([]); // Corrected initial state

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const response = await fetch("./src/data/data.json");
        const data = await response.json();
        setSavedProducts(data.users[0].savedProducts || []); // Setting fetched products
      } catch (error) {
        console.error("Error fetching saved products:", error);
      }
    };

    fetchSavedProducts();
  }, []);

  const handleRemoveProduct = (productId) => {
    setSavedProducts(
      (prevProducts) =>
        prevProducts.filter((product) => product.id !== productId) // Remove product by id
    );
  };

  return (
    <section className="text-center pt-4">
      <h2 className="text-5xl font-extrabold uppercase text-[#fc372d] mb-2">
        Saved Products
      </h2>
      <p className="text-[#464646] text-xl font-semibold mb-6">
        📌 You asked for it, we delivered. Here are your saved picks!
      </p>

      {savedProducts.length === 0 ? (
        <p className="text-[#464646] mt-4 text-center">No saved products.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-6 justify-center">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSave={handleRemoveProduct} // Pass the remove function
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedProducts;
