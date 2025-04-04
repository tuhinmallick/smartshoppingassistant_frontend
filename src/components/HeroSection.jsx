import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full flex flex-col md:flex-row items-center pb-10 pt-20 px-20 overflow-hidden">
      {/* Hero Content */}
      <div className="relative w-full md:w-1/2 z-10">
        <h2 className="text-[#fc372d] font-extrabold uppercase">
          <span className="text-4xl">The</span> <br />
          <span className="text-8xl">
            Smart <br /> Shoppers
          </span>
          <br />
          <span className="text-4xl">Corner of the Internet</span>
        </h2>
        <p className="text-xl font-semibold text-[#464646] mt-4">
          The ultimate platform that helps you find the best deals, <br />
          compare prices, and save money effortlessly!
        </p>
      </div>

      {/* Hero Image with Floating Animations */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center">
        <div className="relative w-full h-full flex justify-center">
          {/* Main Hero Image */}
          <img
            src="./src/assets/herosection.png"
            alt="Hero"
            className="w-full max-w-md transform transition-all duration-500 hover:scale-105"
          />

          {/* Floating Elements */}
          <div
            className="absolute top-[-5%] right-[15%] w-20 md:w-28"
            style={{ animation: "float 5s ease-in-out infinite" }}
          >
            {/* SVG Lightning Effect */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 92 118"
            >
              <path
                fill="#FC372D"
                d="M58.763 101.128 46.52 96.459l42.44-16.926-22.42 16.227 11.172 7.869-51.492 13.384 32.544-15.885Z"
              />
              <path
                fill="#FC372D"
                d="M90.15.586 38.893 43.269l9.055 7.537-27.974 23.218 9.725 8.58L.437 115.999l48.736-36.96-10.497-7.854L71.89 41.09l-9.19-7.443L90.15.587Z"
              />
            </svg>
          </div>
          <div
            className="absolute bottom-[-5%] right-[-5%]"
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            <img
              src="./src/assets/Price_Comparison.png"
              alt="Price Comparision"
              className="w-full max-w-lg md:max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
