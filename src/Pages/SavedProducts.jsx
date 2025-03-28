import React, { useState, useEffect } from "react";
import { getFromLocalStorage } from "../data/localstorage";

const SavedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = getFromLocalStorage("savedProducts") || [];
    setProducts(savedProducts);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Saved Products</h2>
      {products.length === 0 ? (
        <p>No saved products.</p>
      ) : (
        <ul className="list-disc pl-5">
          {products.map((product, index) => (
            <li key={index}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedProducts;
