import React from "react";
import { ArrowRight } from "lucide-react";

const Button = ({ text, onClick, type = "submit", icon = null }) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="blob-btn text-[#fc372d] font-extrabold flex items-center gap-2"
        onClick={onClick}
        type={type}
      >
        <span className="relative z-10">{text}</span>

        {icon && <span className="relative z-10">{icon}</span>}

        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
          </span>
        </span>
      </button>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Button;
