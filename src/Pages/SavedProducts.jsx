import React, { useEffect, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import useWishlist from "../hooks/useWishlist"; // Import useWishlist hook
import { FaTrash } from "react-icons/fa"; // Import trash icon

const SavedProducts = () => {
  const { wishlist, toggleWishlistItem } = useWishlist(); // Get wishlist data and toggle function from the hook
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    // Use wishlist data directly
    setSavedProducts(Object.values(wishlist)); // Convert the wishlist object to an array of products
  }, [wishlist]);

  const handleRemoveProduct = (productId) => {
    // Call the toggle function to remove the product from the wishlist
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
          {savedProducts.map((product) => (
            <div key={product.id} className="relative">
              {/* Pass product details to the ProductCard component and set isSavedPage to true */}
              <ProductCard
                product={product}
                onRemove={() => handleRemoveProduct(product.id)} // Remove function for trash icon
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedProducts;
