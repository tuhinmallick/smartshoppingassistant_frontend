import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import DealsGrid from "../components/DealsGrid";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Search Bar */}
      <section className="w-full flex justify-center py-8">
        <SearchForm />
      </section>

      {/* Featured Deals */}
      <section className="py-12 text-center px-4">
        <div className="mx-auto">
          <h2 className="text-6xl font-extrabold uppercase text-[#fc372d] mb-8">
            Featured Deals
          </h2>
          <DealsGrid />
        </div>
      </section>

      <Newsletter />

      <section className="w-full py-12 text-center px-4">
        <h2 className="text-6xl font-extrabold uppercase text-[#fc372d] mb-8">
          Hottest Offers
        </h2>
        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT SIDE - Sorted By (Sidebar Style) */}
          <div className="w-full md:w-1/4 px-10">
            <h2 className="text-2xl font-extrabold uppercase text-[#464646] mt-8 mb-4 text-center md:text-left">
              Sorted By
            </h2>
            <div className="flex flex-col gap-2">
              {["Apple", "Samsung", "Google", "OnePlus"].map((brand, index) => (
                <Link
                  key={index}
                  to={`/brand/${brand.toLowerCase()}`}
                  className="shadow-lg shadow-black border-2 border-[#2c2c2c] text-[#464646] hover:text-white hover:bg-[#fc372d] w-fit block px-4 py-2 font-extrabold uppercase transition-all duration-300"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - Hottest Offers */}
          <div className="w-full md:w-3/4">
            <ProductGrid />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
