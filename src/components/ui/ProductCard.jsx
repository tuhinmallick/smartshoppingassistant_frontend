import React from "react";
import { ArrowRight, Trash, Heart, Star } from "lucide-react";
import Button from "./Button";
import logoMap from "../ui/logoMap";

const ProductCard = ({
  product,
  onSave,
  isInWishlist,
  isWishlist,
  onViewDetails,
}) => {
  const storeName = product?.Store;
  const storeLogo = logoMap[storeName];

  return (
    <div
      className="relative border-2 my-4 p-6 border-[#2C2C2C] bg-white w-auto 
              shadow-xl hover:scale-105 transition-all duration-300 ease-in-out text-center"
    >
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

      {/* Shipping */}
      {product.shippingCost && (
        <p className="text-sm mt-1 text-gray-600">
          Shipping: {product.shippingCost} {product.currency}
        </p>
      )}

      {/* Availability */}
      {product.availability !== undefined && (
        <p
          className={`text-sm font-medium mt-1 ${
            product.availability ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.availability ? "In Stock" : "Out of Stock"}
        </p>
      )}

      {/* Specs */}
      <p className="text-sm text-[#464646] mt-2">
        {product.color && <span>Color: {product.color} </span>}
        {product.ram_gb > 0 && <span>| RAM: {product.ram_gb}GB </span>}
        {product.storage_gb > 0 && (
          <span>| Storage: {product.storage_gb}GB</span>
        )}
      </p>

      {/* Seller Info */}
      <div className="text-sm mt-2 text-gray-700">
        {/* Store Logo */}
        {storeLogo && (
          <div className="flex justify-center mb-2">
            <img
              src={storeLogo}
              alt={`${storeName} logo`}
              className="w-20 h-auto object-contain"
            />
          </div>
        )}

        {product.storeRating && (
          <p className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{product.storeRating}/5</span>
          </p>
        )}
      </div>

      {/* External product link */}
      <div className="mt-4">
        <Button
          text="To Offer"
          onClick={() => onViewDetails?.(product)} // use optional chaining just in case
          icon={<ArrowRight className="w-5 h-5" />}
        />
      </div>

      {/* Wishlist icon */}
      {!isWishlist && (
        <button
          onClick={() => onSave(product)} // Add to wishlist or remove it
          className="absolute top-2 right-2 text-pink-500 hover:text-pink-700 transition-colors duration-300"
          aria-label="Add to Wishlist"
        >
          <Heart
            className={`w-6 h-6 ${
              isInWishlist ? "fill-pink-500" : "fill-none"
            }`}
          />
        </button>
      )}

      {/* Trash icon (for wishlist only) */}
      {isWishlist && (
        <button
          onClick={() => onSave(product.id)} // Remove from wishlist
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-300"
          aria-label="Remove from Wishlist"
        >
          <Trash className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
