import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchForm from "../components/SearchForm";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import DealsGrid from "../components/DealsGrid";
import Newsletter from "../components/Newsletter";
import useWishlist from "../hooks/useWishlist";
import { fetchBestPriceProducts } from "../api/authAPI";

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate instead of useHistory

  useEffect(() => {
    const loadBestPriceProducts = async () => {
      try {
        const bestProducts = await fetchBestPriceProducts();
        setProducts(bestProducts);
      } catch (error) {
        console.error("Failed to load best price products:", error);
      }
    };

    loadBestPriceProducts();
  }, []);

  const { toggleWishlistItem, isInWishlist } = useWishlist();

  const filteredProducts = selectedBrand
    ? products.filter(
        (product) =>
          product.brand &&
          product.brand.toLowerCase() === selectedBrand.toLowerCase()
      )
    : products;

  const handleViewDetails = (product) => {
    navigate(`/product/${product.name}`); // ✅ navigate instead of history.push
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
  <section className="w-full py-12 text-center px-4">
        <h2 className="text-6xl font-extrabold uppercase text-[#fc372d] mb-8">
          Hottest Offers
        </h2>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/4 px-10">
            <h2 className="text-2xl font-extrabold uppercase text-[#464646] mt-8 mb-4 text-center md:text-left">
              Sorted By
            </h2>
            <div className="flex flex-col gap-2">
              {["Apple", "Samsung", "Google", "OnePlus"].map((brand, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBrand(brand)}
                  className={`shadow-lg border-2 border-[#2c2c2c] text-[#464646] hover:text-white hover:bg-[#fc372d] w-fit block px-4 py-2 font-extrabold uppercase transition-all duration-300 ${
                    selectedBrand === brand ? "bg-[#fc372d] text-white" : ""
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {filteredProducts.length === 0 ? (
              <p className="text-xl text-[#464646]">No products found.</p>
            ) : (
              <ProductGrid
                products={filteredProducts}
                onSave={toggleWishlistItem}
                isInWishlist={isInWishlist}
                isWishlist={false}
                onViewDetails={handleViewDetails} // ✅ pass it to ProductCard
              />
            )}
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center py-8">
        <SearchForm />
      </section>

      <Newsletter />

    
    </div>
  );
};

export default Home;
