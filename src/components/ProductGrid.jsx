import React from "react";
import ProductCard from "./ui/ProductCard";

const products = [
  {
    id: 1,
    name: "Apple iPhone 13",
    description: "Powerful A15 Bionic chip & stunning OLED display.",
    image: "/src/assets/Iphone14.jpg",
    price: "$799",
    oldPrice: "$899",
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    description: "Dynamic AMOLED 2X display with 120Hz refresh rate.",
    image: "/src/assets/samsung22.jpg",
    price: "$699",
    oldPrice: "$799",
  },
  {
    id: 3,
    name: "Google Pixel 7",
    description: "Next-gen AI camera & pure Android experience.",
    image: "/src/assets/google-phone.png",
    price: "$599",
    oldPrice: "$699",
  },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
