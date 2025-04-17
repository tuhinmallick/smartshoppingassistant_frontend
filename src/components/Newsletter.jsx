import React from "react";

const Newsletter = () => {
  return (
    <div className="newsletter-container py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left - Image Section */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className="image-wrap w-full max-w-md">
            <img
              src="//arnoldspumpclub.com/cdn/shop/files/newsletter-arnold.png?v=1700716776"
              alt="Arnold's Daily Email"
              className="w-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="newsletter-section__trophy absolute top-[5%] left-[0%] w-[30%] animate-[float_4.5s_ease-in-out_infinite]">
            <img src="./src/assets/cart.jpg" alt="Cart Trolly" />
          </div>

          <div className="newsletter-section__lamp absolute top-[17%] right-[-9%] w-[40%] animate-[float_5s_ease-in-out_infinite]">
            <img
              src="//arnoldspumpclub.com/cdn/shop/t/4/assets/newsletter-lamp.png?v=33297788489220354801724268561"
              alt="Lamp"
            />
            <img
              src="//arnoldspumpclub.com/cdn/shop/t/4/assets/newsletter-lamp-flicker.png?v=55814685857881695871701788258"
              className="absolute top-0 left-0 animate-[flicker_4s_linear_infinite]"
              alt="Flicker Lamp"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
          <h2 className="text-[#fc372d] text-4xl md:text-5xl font-extrabold uppercase">
            Smart Shopper's <br />
            Daily Email
          </h2>
          <p className="text-xl text-[#464646] font-semibold mt-6">
            Discover the best deals and prices across multiple platforms. <br />
            Compare your favorite products and save time and money with <br />
            smart shopping decisions every day.
          </p>
          <div className="mt-8">
            <a className="bg-[#2c2c2c] text-white hover:bg-[#fc372d] py-4 px-6 text-lg font-extrabold uppercase inline-block rounded transition duration-300">
              View Posts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
