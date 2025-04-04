import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "./Button";

const ProductCard = ({ product, onSave }) => {
  return (
    <div
      className="relative border-2 text-center my-4 p-6 border-[#2C2C2C] shadow-black bg-white w-auto 
              shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-0 left-0 bg-[#fc372d] text-white font-bold text-sm px-3 py-1 rounded-br-lg">
          {product.discount}
        </div>
      )}

      {/* Product Details */}
      <h3 className="text-xl font-extrabold text-[#464646]">{product.name}</h3>

      {/* Product Image */}
      <div className="flex justify-center mt-4">
        <img
          src={product.image}
          alt={product.name}
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
        onClick={() => alert("Redirecting to offer")}
        icon={<ArrowRight className="w-5 h-5" />}
      />
    </div>
  );
};

export default ProductCard;
