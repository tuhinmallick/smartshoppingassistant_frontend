import React from "react";
import { useParams, Link } from "react-router-dom";

const brandData = {
  apple: {
    name: "Apple",
    description:
      "Explore the latest Apple products, including iPhones, iPads, and MacBooks.",
    products: [
      {
        id: 1,
        name: "iPhone 13",
        description:
          "The latest iPhone with A15 Bionic chip and stunning OLED display.",
        image: "/src/assets/Iphone14.jpg",
      },
      {
        id: 2,
        name: "MacBook Pro",
        description: "Powerful laptop with M1 chip and Retina display.",
        image: "/src/assets/applelaptop.jpg",
      },
    ],
  },
  samsung: {
    name: "Samsung",
    description:
      "Discover Samsung's range of smartphones, tablets, and smartwatches.",
    products: [
      {
        id: 1,
        name: "Galaxy S22",
        description: "Dynamic AMOLED 2X display with 120Hz refresh rate.",
        image: "/src/assets/samsung22.jpg",
      },
    ],
  },
  google: {
    name: "Google",
    description: "Check out Google's Pixel phones, Nest devices, and more.",
    products: [
      {
        id: 1,
        name: "Pixel 7",
        description: "Next-gen AI camera and pure Android experience.",
        image: "/src/assets/google-phone.png",
      },
    ],
  },
  oneplus: {
    name: "OnePlus",
    description:
      "Experience the speed and power of OnePlus smartphones and accessories.",
    products: [
      {
        id: 1,
        name: "OnePlus 11",
        description:
          "Flagship smartphone with Snapdragon 8 Gen 2 and Hasselblad camera.",
        image: "/src/assets/oneplus11.jpg",
      },
      {
        id: 2,
        name: "OnePlus Buds Pro 2",
        description:
          "Premium wireless earbuds with ANC and superior sound quality.",
        image: "/src/assets/oneplusbuds.jpg",
      },
    ],
  },
};

const BrandDetails = () => {
  const { brand } = useParams();
  const brandDetails = brandData[brand.toLowerCase()];

  if (!brandDetails) {
    return <div className="min-h-screen p-4">Brand not found</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Brand: {brandDetails.name}</h1>
      <p className="mb-8">{brandDetails.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandDetails.products.map((product) => (
          <div
            key={product.id}
            className="p-6 rounded-lg shadow-lg text-black hover:scale-105 transition bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <Link
              to={`/product/${product.id}`}
              className="mt-3 inline-block bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDetails;
