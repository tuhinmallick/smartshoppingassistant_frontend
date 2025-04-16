import React from "react";
import { Heart, Trash } from "lucide-react";
import Button from "./Button";
import logoMap from "../ui/logoMap";

const ProductCard = ({
  product,
  onSave, // This is the function passed down from ProductGrid
  isInWishlist,
  isWishlist,
  onViewDetails,
}) => {
  const storeName = product?.Store;
  const storeLogo = logoMap[storeName];

  return (
    <div className="relative border-2 my-4 p-6 border-[#2C2C2C] bg-white w-auto shadow-xl hover:scale-105 transition-all duration-300 ease-in-out text-center">
      {/* Discount badge */}
      {product.discount && (
        <div className="absolute top-0 left-0 bg-[#fc372d] text-white font-bold text-sm px-3 py-1 rounded-br-lg">
          {product.discount}
        </div>
      )}

      <h3 className="text-xl font-extrabold text-[#464646] mb-2">
        {product.name}
      </h3>
      {/* Product image */}
      <div className="flex justify-center">
        <img
          src={product.mainImgUrl}
          alt={product.name || "Product Image"}
          className="w-28 h-28 object-contain rounded-md shadow-sm"
        />
      </div>

      {/* Price */}
      <div className="text-xl font-bold mt-2">
        <span className="text-[#464646]">Price:</span>{" "}
        <span className="text-green-600">
          {product.price} {product.currency}
        </span>
      </div>

      {/* Wishlist icon */}
      {!isWishlist && (
        <button
          onClick={() => onSave(product)} // Calls toggleWishlistItem
          className="absolute top-2 right-2 text-pink-500 hover:text-pink-700 transition-colors duration-300 ease-in-out"
          aria-label="Add to Wishlist"
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 ease-in-out ${
              isInWishlist ? "fill-pink-500" : "fill-none"
            }`}
          />
        </button>
      )}

      {/* Trash icon (for wishlist only) */}
      {isWishlist && (
        <button
          onClick={() => onSave(product.id)} // Removes from wishlist
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-300 ease-in-out"
          aria-label="Remove from Wishlist"
        >
          <Trash className="w-6 h-6 transition-all duration-300 ease-in-out hover:scale-110" />
        </button>
      )}

      <Button text="To Offer" onClick={() => onViewDetails?.(product)} />
    </div>
  );
};

export default ProductCard;
