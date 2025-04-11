import React, { useEffect, useState } from "react";
import ProductCard from "./ui/ProductCard";
import { fetchBestPriceProducts } from "../api/authAPI";

const PRODUCTS_PER_PAGE = 4;

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const loadBestPriceProducts = async () => {
      try {
        const bestProducts = await fetchBestPriceProducts();
        setProducts(bestProducts);
      } catch (error) {
        console.error("Failed to load best price products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBestPriceProducts();
  }, []);

  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    const maxPage = Math.floor((products.length - 1) / PRODUCTS_PER_PAGE);
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > PRODUCTS_PER_PAGE && (
        <div className="flex gap-4 justify-center mt-6">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="disabled:opacity-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="text-black hover:scale-105 transition-transform"
            >
              <circle
                cx="24"
                cy="24"
                r="23"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points="27,16 19,24 27,32"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={endIndex >= products.length}
            className="disabled:opacity-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="text-black hover:scale-105 transition-transform rotate-180"
            >
              <circle
                cx="24"
                cy="24"
                r="23"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points="27,16 19,24 27,32"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
