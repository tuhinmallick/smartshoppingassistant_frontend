import React, { useEffect, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import useWishlist from "../hooks/useWishlist";
import { FaTrash } from "react-icons/fa"; // Import Trash icon from react-icons

const SavedProducts = () => {
  const { wishlist, toggleWishlistItem } = useWishlist();
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    setSavedProducts(Object.values(wishlist)); // Use wishlist state to get saved products
  }, [wishlist]);

  const handleRemoveProduct = (productId) => {
    toggleWishlistItem({ id: productId }); // Call the toggle function to remove product
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
              <ProductCard
                product={product}
                onSave={() => handleRemoveProduct(product.id)} // Handle product removal
                isWishlist={true} // This ensures Trash icon is shown
                isSavedProductsPage={true} // This prop ensures we display the Trash icon on this page
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedProducts;
