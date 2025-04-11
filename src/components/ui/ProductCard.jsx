import React from "react";
import { ArrowRight, Trash, Heart } from "lucide-react"; // Add Heart icon
import Button from "./Button";

const ProductCard = ({ product, onSave, isInWishlist, isWishlist }) => {
  return (
    <div
      className="relative border-2 text-center my-4 p-6 border-[#2C2C2C] shadow-black bg-white w-auto 
              shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
    >
      {product.discount && (
        <div className="absolute top-0 left-0 bg-[#fc372d] text-white font-bold text-sm px-3 py-1 rounded-br-lg">
          {product.discount}
        </div>
      )}

      <h3 className="text-xl font-extrabold text-[#464646]">{product.name}</h3>

      <div className="flex justify-center mt-4">
        <img
          src={product.mainImgUrl}
          alt={product.name || "Product Image"}
          className="w-28 h-28 object-contain rounded-md shadow-sm"
        />
      </div>

      <div className="flex justify-center text-xl font-bold gap-2 mt-2">
        <label className="text-[#464646] uppercase">Price:</label>
        <p className="text-green-600">{product.price}</p>
      </div>

      {product.oldPrice && (
        <p className="text-2xl text-[#fc372d] font-mono mt-1 line-through">
          {product.oldPrice}
        </p>
      )}

      <p className="text-sm font-bold text-[#464646] mt-2">
        {product.description}
      </p>

      <Button
        text="To Offer"
        onClick={() => window.open(product.link, "_blank")}
        icon={<ArrowRight className="w-5 h-5" />}
      />

      {/* Heart Icon */}
      {!isWishlist && (
        <button
          onClick={() => onSave(product)}
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

      {/* Trash icon only in wishlist */}
      {isWishlist && (
        <button
          onClick={() => onSave(product.id)}
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
