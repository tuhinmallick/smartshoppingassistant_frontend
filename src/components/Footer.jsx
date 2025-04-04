import React, { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    // Flip Arnold Image on Mouse Move
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const arnoldImage = document.querySelector(".footer-app__arnold");
      if (arnoldImage) {
        if (x < window.innerWidth / 2) {
          arnoldImage.classList.add("flip");
        } else {
          arnoldImage.classList.remove("flip");
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Shopify Footer Section */}
      <div
        id="shopify-section-sections--21283168813352__footer-app"
        className="shopify-section shopify-section-group-footer-group"
      >
        <div id="app" className="footer-app px-10 md:px-20 mb-[-80px]">
          <div className="footer-app__container text-center max-w-[1200px] mx-auto">
            {/* Title */}
            <div className="footer-app__title text-xl py-8 uppercase font-extrabold text-[#FC372D]">
              <h2>
                Compare Prices Instantly! 🚀 <br />
                <span className="text-6xl font-extrabold">
                  Shop Smarter, Save Bigger
                </span>
              </h2>
            </div>

            {/* Call to Action */}
            <div className="theme-block my-4">
              <a className="bg-[#2c2c2c] text-[#fff] hover:bg-[#fc372d] font-extrabold py-4 px-6 text-lg uppercase">
                learn more
              </a>
            </div>

            {/* Image Section */}
            <div className="footer-app__image z-10 relative mx-auto mt-10">
              <img
                src="//arnoldspumpclub.com/cdn/shop/t/4/assets/pump-app-phone.png?v=14004366077603502521724268563"
                className="w-full"
                alt="App Phone"
              />

              {/* Floating Elements */}
              <img
                src="/src/assets/shopping.png"
                className="footer-app__shopping absolute bottom-[30%] left-[7%] w-[10%] animate-float"
                alt="Shopping"
              />
              <img
                src="/src/assets/computer.jpg"
                className="footer-app__bags absolute top-[-5%] left-[10%] w-[25%] animate-float"
                alt="Bags"
              />
              <img
                src="//arnoldspumpclub.com/cdn/shop/t/4/assets/pump-app-moon.png?v=88087178589212267601724268562"
                className="footer-app__moon absolute top-[-3%] right-[20%] w-[30%] animate-float"
                alt="Moon"
              />
              <img
                src="/src/assets/bag.jpg"
                className="footer-app__price absolute bottom-[22%] right-[5%] w-[12%] animate-float"
                alt="Price"
              />
              <img
                src="//arnoldspumpclub.com/cdn/shop/t/4/assets/pump-app-arnold.png?v=157079851756673686591724268562"
                className="footer-app__arnold absolute top-0 left-0 w-full"
                alt="Arnold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="relative bg-[#fa3c2c] py-16 flex flex-col px-8 text-white">
        {/* Centered Phone Image */}
        <h2 className="text-white text-2xl uppercase font-extrabold">
          Looking to get in shape
        </h2>
        <h2 className="text-white text-8xl uppercase font-extrabold">
          while saving money?
        </h2>

        {/* Footer Bottom */}
        <div className="text-center mt-10 text-xs opacity-75">
          <div className="flex flex-col md:flex-row justify-between pb-10 items-center">
            {/* Left Section - Social Icons */}
            <div className="flex space-x-4 text-4xl">
              <a href="#" className="flex items-center">
                📷
              </a>
              <a href="#" className="flex items-center">
                ▶️
              </a>
              <a href="#" className="flex items-center">
                🐦
              </a>
              <a href="#" className="flex items-center">
                🎵
              </a>
            </div>

            {/* Right Section - Footer Links */}
            <div className="flex space-x-6 font-extrabold text-md uppercase">
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
      </footer>

      {/* Styles & Animations */}
      <style>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .footer-app__arnold.flip {
          transform: scaleX(-1);
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </>
  );
};

export default Footer;
