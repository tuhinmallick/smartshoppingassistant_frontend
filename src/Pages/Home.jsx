import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Hero Section */}
      <section
        className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-cover bg-center relative px-6 md:px-20"
        style={{
          backgroundImage: "url('/assets/image.png')",
          backgroundColor: "#FFFFFF",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Dark Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Left Content (Text) */}
        <div className="relative z-10 w-full md:w-1/2 text-center md:text-left text-white">
          <h1
            className="text-4xl sm:text-6xl font-bold mb-6"
            style={{
              color: "#FFD700",
              fontFamily: '"Satoshi Variable", sans-serif',
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            Discover the Best Mobile Deals
          </h1>
          <p
            className="text-lg sm:text-xl mb-8"
            style={{
              fontFamily: '"Satoshi Variable", sans-serif',
              textShadow: "1px 1px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            Compare prices from top retailers & save big!
          </p>
          <Link
            to="/search"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
        {/* Right Content (Image) */}
        <div className="relative z-10 w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="/assets/image.png" // Ensure this path is correct
            alt="Mobile Deals"
            className="max-w-xs md:max-w-md rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Search Bar */}
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

      {/* Shop by Category */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-4xl font-bold mb-8"
            style={{ color: "#1E90FF" }} // Dodger blue for section titles
          >
            Explore by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Electronics", "Fashion", "Home"].map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.toLowerCase()}`}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-8 rounded-xl shadow-lg hover:scale-105 transition flex flex-col items-center justify-center"
              >
                <span className="text-5xl mb-4">🔹</span>
                <h3
                  className="text-2xl font-semibold"
                  style={{ color: "#001080" }} // Orange red for category names
                >
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-8"
            style={{
              color: "#800080",
              fontFamily: '"Satoshi Variable", sans-serif',
            }}
          >
            Featured Deals
          </h2>
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
                className="p-6 rounded-lg shadow-lg text-black hover:scale-105 transition"
                style={{
                  background: "linear-gradient(to right, #f0f8ff, #e6e6fa)",
                }}
              >
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3
                  className="text-xl font-semibold"
                  style={{
                    color: "#4B0082",
                    fontFamily: '"Satoshi Variable", sans-serif',
                  }}
                >
                  {deal.name}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#696969",
                    fontFamily: '"Satoshi Variable", sans-serif',
                  }}
                >
                  {deal.desc}
                </p>
                <div className="flex justify-between">
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: "#FF4500",
                      fontFamily: '"Satoshi Variable", sans-serif',
                    }}
                  >
                    {deal.discount}
                  </span>
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

      {/* Shop by Brand */}
      <section className="py-8 px-4 bg-white w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "#9932CC" }} // Dark orchid for shop by brand title
          >
            Shop by Brand
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["Apple", "Samsung", "Google", "OnePlus"].map((brand, index) => (
              <Link
                key={index}
                to={`/search?q=${brand.toLowerCase()}`}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-transform duration-300 ease-in-out"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hottest Mobile Phones */}
      <section
        className="py-12 px-4 bg-gradient-to-r from-blue-200 via-blue-300 to-teal-400 text-white"
        style={{ backgroundImage: "url('/images/products-bg.jpg')" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-8"
            style={{
              fontFamily: '"Satoshi Variable", sans-serif',
              color: "#008080",
            }}
          >
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
                className="p-6 rounded-lg shadow-lg text-black hover:scale-105 transition bg-gradient-to-r from-blue-200 via-blue-300 to-teal-400"
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
};

export default Home;
