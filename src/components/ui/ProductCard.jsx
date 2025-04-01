import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product, isRecommended }) => {
  return (
    <motion.div
      className={`relative bg-white p-6 rounded-2xl shadow-lg w-72 text-center border-2 ${
        isRecommended ? "border-green-600 scale-105" : "border-gray-400"
      } transition-all duration-300 hover:shadow-black`}
      whileHover={{ scale: 1.05 }}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2">
          RECOMMENDED
        </span>
      )}

      {/* Product Image */}
      <div className="h-[230px] w-full flex justify-center items-center overflow-hidden transition-transform duration-500 ease-in-out group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:-rotate-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
          draggable="false"
        />
      </div>

      {/* Product Info */}
      <h6 className="text-lg font-extrabold text-gray-700 mt-2">
        {product.name}
      </h6>
      <p className="text-4xl text-green-600 font-mono mt-1">{product.price}</p>
      {product.oldPrice && (
        <p className="text-2xl text-red-600 font-mono mt-1 line-through">
          {product.oldPrice}
        </p>
      )}

      <p className="text-sm text-gray-600 mt-2">{product.description}</p>
    </motion.div>
  );
};

export default ProductCard;
