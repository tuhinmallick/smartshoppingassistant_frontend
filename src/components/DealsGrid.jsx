import React from "react";
import ProductCard from "./ui/ProductCard";

const DealsGrid = () => {
  const products = [
    {
      id: 1,
      name: "Apple iPhone 13",
      description: "Save 20% on this powerful A15 Bionic chip device.",
      image: "/src/assets/Iphone14.jpg",
      discount: "20%",
      price: "$599",
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      description: "Get a free accessory bundle with this purchase.",
      image: "/src/assets/samsung22.jpg",
      discount: "Free Bundle",
      price: "$599",
    },
    {
      id: 3,
      name: "Google Pixel 7",
      description: "Limited time offer: Buy one get one 50% off.",
      image: "/src/assets/google-phone.png",
      discount: "BOGO 50%",
      price: "$599",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default DealsGrid;
