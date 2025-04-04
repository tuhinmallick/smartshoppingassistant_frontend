import React from "react";

const Newsletter = () => {
  return (
    <div className="newsletter-container bg-[#e7e1d2]">
      <div className="page-width text-left">
        <div className="flex flex-row items-center">
          {" "}
          {/* Added items-center for vertical centering */}
          <div className="flex-1 relative">
            <div className="image-wrap">
              <img
                src="//arnoldspumpclub.com/cdn/shop/files/newsletter-arnold.png?v=1700716776"
                alt="Arnold's Daily Email"
                className="image-element"
                sizes=""
                loading="lazy"
              />
            </div>
            <div className="newsletter-section__trophy absolute top-[5%] left-[0%] w-[30.2258065%] animate-[float_4.5s_ease-in-out_infinite]">
              <img
                src="./src/assets/cart.jpg"
                width="204"
                height="213"
                alt="Cart Trolly"
              />
            </div>

            <div className="newsletter-section__lamp absolute top-[17.3913043%] right-[-9%] w-[40.8870968%] animate-[float_5s_ease-in-out_infinite]">
              <img
                src="//arnoldspumpclub.com/cdn/shop/t/4/assets/newsletter-lamp.png?v=33297788489220354801724268561"
                width="251"
                height="281"
                alt="Lamp"
              />
              <img
                src="//arnoldspumpclub.com/cdn/shop/t/4/assets/newsletter-lamp-flicker.png?v=55814685857881695871701788258"
                width="251"
                height="281"
                alt="Flicker Lamp"
                className="absolute top-0 left-0 animate-[flicker_4s_linear_infinite]"
              />
            </div>
          </div>
          {/* Right Section: Content */}
          <div className="newsletter-section__content px-12 py-12 items-center justify-center">
            {" "}
            {/* Added flex and items-center to center content */}
            <div className="theme-block">
              <div className="font-extrabold section-header__subtitle text-[#fc372d] uppercase">
                <span className="text-5xl">Smart Shopper's </span>
                <br />
                <span className="text-5xl">Daily Email</span>
              </div>
            </div>
            <div className="theme-block">
              <div className="rte">
                <div className="enlarge-text py-6">
                  <p className="font-semibold text-xl text-[#464646]">
                    Discover the best deals and prices across multiple
                    platforms.
                    <br />
                    Compare your favorite products and save time and money with{" "}
                    <br />
                    smart shopping decisions every day.
                  </p>
                </div>
              </div>
            </div>
            <div className="theme-block my-4">
              <a className="bg-[#2c2c2c] text-[#fff] hover:bg-[#fc372d] font-extrabold py-4 px-4 text-lg uppercase">
                View Posts
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
