import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import ProductCard from "../components/ui/ProductCard";
import useWishlist from "../hooks/useWishlist";
import { FaTrash } from "react-icons/fa";

const SavedProducts = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const { wishlist, toggleWishlistItem } = useWishlist();
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const validProducts = Object.values(wishlist).filter(
      (product) => product && product.id
    );
    setSavedProducts(validProducts);
  }, [wishlist]);

  const handleViewDetails = (product) => {
    navigate(`/product/${product.name}`); // ✅ Use navigate properly
  };

  const handleRemoveProduct = (productId) => {
    if (!productId) {
      console.error("Invalid product ID:", productId);
      return;
    }
    toggleWishlistItem({ id: productId });
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
          {savedProducts.map((product) => {
            if (!product.id) {
              console.error("Product missing id:", product);
              return null;
            }

            return (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onSave={() => handleRemoveProduct(product.id)}
                  isWishlist={true}
                  isSavedProductsPage={true}
                  onViewDetails={handleViewDetails}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SavedProducts;
