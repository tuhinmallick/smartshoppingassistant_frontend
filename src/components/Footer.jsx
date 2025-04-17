import React, { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const arnoldImage = document.querySelector(".footer-app__arnold");
      if (arnoldImage) {
        arnoldImage.classList.toggle("flip", x < window.innerWidth / 2);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Footer Top Section */}
      <div className="px-6 md:px-20 mb-[-80px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-xl py-4 uppercase font-extrabold text-[#FC372D]">
            Compare Prices Instantly! 🚀
            <br />
            <span className="text-5xl md:text-6xl font-extrabold">
              Shop Smarter, Save Bigger
            </span>
          </h2>
          <div className="my-4">
            <a className="bg-[#2c2c2c] text-white hover:bg-[#fc372d] py-4 px-6 text-lg font-extrabold uppercase rounded transition duration-300 inline-block">
              Learn More
            </a>
          </div>

          {/* Images */}
          <div className="relative w-full max-w-3xl mx-auto my-10">
            <img
              src="//arnoldspumpclub.com/cdn/shop/t/4/assets/pump-app-phone.png?v=14004366077603502521724268563"
              className="w-full"
              alt="App Phone"
            />
            <img
              src="./src/assets/shopping.png"
              className="absolute bottom-[30%] left-[7%] w-[10%] animate-float"
              alt="Shopping"
            />
            <img
              src="./src/assets/computer.jpg"
              className="absolute top-[-5%] left-[10%] w-[25%] animate-float"
              alt="Computer"
            />
            <img
              src="//arnoldspumpclub.com/cdn/shop/t/4/assets/pump-app-moon.png?v=88087178589212267601724268562"
              className="absolute top-[-3%] right-[20%] w-[30%] animate-float"
              alt="Moon"
            />
            <img
              src="./src/assets/bag.jpg"
              className="absolute bottom-[22%] right-[5%] w-[12%] animate-float"
              alt="Bag"
            />
            <img
              src="//arnoldspumpclub.com/cdn/shop/t/4/assets/pump-app-arnold.png?v=157079851756673686591724268562"
              className="footer-app__arnold absolute top-0 left-0 w-full"
              alt="Arnold"
            />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#fa3c2c] text-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl uppercase font-extrabold">
            Looking to get in shape
          </h2>
          <h2 className="text-5xl sm:text-6xl md:text-8xl uppercase font-extrabold mt-2">
            while saving money?
          </h2>

          {/* Footer Bottom */}
          <div className="mt-10 text-xs opacity-75">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-10">
              {/* Socials */}
              <div className="flex gap-4 text-2xl">
                <a href="#">📷</a>
                <a href="#">▶️</a>
                <a href="#">🐦</a>
                <a href="#">🎵</a>
              </div>

              {/* Links */}
              <div className="flex flex-wrap justify-center gap-4 text-md font-extrabold uppercase">
                <a href="#" className="underline">
                  Podcast
                </a>
                <a href="#" className="underline">
                  Newsletter
                </a>
                <a href="#" className="underline">
                  Shop
                </a>
                <a href="#" className="underline">
                  Privacy
                </a>
                <a href="#" className="underline">
                  Terms
                </a>
              </div>
            </div>

            <span className="font-extrabold text-md">
              SmartShoppers © 2025 All Rights Reserved
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .footer-app__arnold.flip {
          transform: scaleX(-1);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
};

export default Footer;
