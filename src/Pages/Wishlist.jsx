import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import DealsGrid from "../components/DealsGrid";
import useWishlist from "../hooks/useWishlist";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const { wishlist, toggleWishlistItem, isInWishlist } = useWishlist();

  const handleViewDetails = (product) => {
    navigate(`/product/${product.name}`); // ✅ navigate instead of history.push
  };

  const wishlistItems = useMemo(() => {
    return Object.values(wishlist).filter((product) => product && product.id);
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
          onSave={toggleWishlistItem}
          isInWishlist={isInWishlist}
          isWishlist={true}
          onViewDetails={handleViewDetails}
        />
      )}
    </section>
  );
};

export default Wishlist;
