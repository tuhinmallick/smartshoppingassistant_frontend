import React from "react";
import ProductCard from "./ui/ProductCard";

const DealsGrid = ({ products = [], onSave, isInWishlist, isWishlist }) => {
  // Add a fallback for products in case it's undefined
  if (!Array.isArray(products)) {
    console.error("Expected products to be an array, but got:", products);
    return null; // Or show an empty state message
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="text-[#464646] mt-4 text-center">
          No products to display
        </p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id} // Ensure this is a unique identifier
            product={product}
            onSave={() => onSave(product)} // Pass the entire product
            isInWishlist={isInWishlist(product.id)}
            isWishlist={isWishlist}
          />
        ))
      )}
    </div>
  );
};

export default DealsGrid;
