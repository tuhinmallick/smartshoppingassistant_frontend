import React from "react";

// Reusable ProductCard Component
const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="card2">
        <div className="product-image">
          <img src={product.image} alt={product.name} draggable="false" />
        </div>
        <div className="product-info p-2 text-gray-600 text-center">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-sm">{product.description}</p>
          <div className="price font-semibold mt-2">{product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
