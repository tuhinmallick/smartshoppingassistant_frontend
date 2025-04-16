import React, { useState, useEffect } from "react";
import ProductCard from "./ui/ProductCard";
import useWishlist from "../hooks/useWishlist"; // Import the hook

const PRODUCTS_PER_PAGE = 4;

const ProductGrid = ({
  products,
  onSave,
  isInWishlist,
  isWishlist,
  onViewDetails,
}) => {
  const { toggleWishlistItem } = useWishlist(); // Use the hook to get the function

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  const filteredProducts = Array.isArray(products) ? products : [];
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    const maxPage = Math.floor(
      (filteredProducts.length - 1) / PRODUCTS_PER_PAGE
    );
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {currentProducts.length === 0 ? (
          <p className="text-[#464646] mt-4 text-center">
            No products to display
          </p>
        ) : (
          currentProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onSave={toggleWishlistItem} // Pass the toggleWishlistItem function
              isInWishlist={isInWishlist(product.id)}
              isWishlist={isWishlist}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>

      {filteredProducts.length > PRODUCTS_PER_PAGE && (
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="disabled:opacity-30"
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            disabled={endIndex >= filteredProducts.length}
            className="disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
