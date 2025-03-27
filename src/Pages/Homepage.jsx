import React from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
     
      <section
        className="w-full h-screen flex flex-col justify-center items-center text-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Find the Best Mobile Deals
          </h1>
          <p className="mt-2 text-lg sm:text-xl">
            Compare prices from top retailers & save big!
          </p>
        </div>
      </section>

      
      <section className="w-full flex justify-center py-8 bg-white shadow-md">
        <div className="flex w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search for phones, brands..."
            className="w-full p-4 border border-gray-300 rounded-l-full focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <button className="bg-blue-600 text-white px-6 py-4 rounded-r-full hover:bg-blue-700 transition">
            🔍
          </button>
        </div>
      </section>

      
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Electronics", icon: "🖥️", color: "bg-indigo-400" },
              { name: "Fashion", icon: "👕", color: "bg-purple-400" },
              { name: "Home", icon: "🏠", color: "bg-teal-400" },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className={`${category.color} text-white p-8 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition flex flex-col items-center justify-center text-center`}
              >
                <span className="text-5xl mb-4">{category.icon}</span>
                <h3 className="text-2xl font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: "Apple iPhone 13",
                desc: "Save 20% on this powerful A15 Bionic chip device.",
                image: "/images/iphone13.jpg",
                discount: "20%",
              },
              {
                id: 2,
                name: "Samsung Galaxy S22",
                desc: "Get a free accessory bundle with this purchase.",
                image: "/images/galaxy-s22.jpg",
                discount: "Free Bundle",
              },
              {
                id: 3,
                name: "Google Pixel 7",
                desc: "Limited time offer: Buy one get one 50% off.",
                image: "/images/pixel7.jpg",
                discount: "BOGO 50%",
              },
            ].map((deal) => (
              <div
                key={deal.id}
                className="bg-white p-6 rounded-lg shadow-lg text-black hover:scale-105 transition"
              >
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{deal.name}</h3>
                <p className="text-sm text-gray-600">{deal.desc}</p>
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-red-600">{deal.discount}</span>
                  <Link
                    to={`/product/${deal.id}`}
                    className="mt-3 inline-block bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-8 px-4 bg-white w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Shop by Brand</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["Apple", "Samsung", "Google", "OnePlus"].map((brand, index) => (
              <Link
                key={index}
                to={`/search?q=${brand.toLowerCase()}`}
                className="px-6 py-3 bg-gray-100 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

     
      <section
        className="py-12 px-4 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/products-bg.jpg')" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Hottest Mobile Phones
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         
            {[
              {
                id: 1,
                name: "Apple iPhone 13",
                desc: "Powerful A15 Bionic chip & stunning OLED display.",
                image: "/images/iphone13.jpg",
              },
              {
                id: 2,
                name: "Samsung Galaxy S22",
                desc: "Dynamic AMOLED 2X display with 120Hz refresh rate.",
                image: "/images/galaxy-s22.jpg",
              },
              {
                id: 3,
                name: "Google Pixel 7",
                desc: "Next-gen AI camera & pure Android experience.",
                image: "/images/pixel7.jpg",
              },
            ].map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-lg text-black hover:scale-105 transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.desc}</p>
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
      </section>
    </div>
  );
}