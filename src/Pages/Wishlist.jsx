import React, { useMemo } from "react";
import DealsGrid from "../components/DealsGrid";
import useWishlist from "../hooks/useWishlist";

const Wishlist = () => {
  const { wishlist, toggleWishlistItem, isInWishlist } = useWishlist();

  console.log("Wishlist state:", wishlist);

  const wishlistItems = useMemo(() => {
    return Object.values(wishlist); // Extract wishlist items
  }, [wishlist]);

  return (
    <section className="w-full py-12 text-center px-4">
      <h2 className="text-6xl font-extrabold uppercase text-[#fc372d] mb-8">
        My Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="text-xl text-gray-700">No items in your wishlist.</p>
      ) : (
        <DealsGrid
          products={wishlistItems}
          onSave={toggleWishlistItem} // Handle adding/removing from wishlist
          isInWishlist={isInWishlist} // Check if item is in wishlist
          isWishlist={true} // Ensure Trash icon appears on the Wishlist page
        />
      )}
    </section>
  );
};

export default Wishlist;
