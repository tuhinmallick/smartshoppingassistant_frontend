import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-full max-w-2xl p-6"
    >
      <div className="relative w-full shadow-xl shadow-black rounded-full">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search phones here ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-6 py-4 text-[#fc372d] font-extrabold border-2 border-[#2c2c2c] rounded-full 
            transition-all duration-300 focus:ring-2 focus:ring-[#2c2c2c] 
            text-xl bg-transparent focus:bg-[#fef6e4]  
            ${isFocused ? "shadow-lg scale-105" : "shadow-lg"}
          `}
        />

        {/* Animated Search Icon as Button */}
        <button
          type="submit"
          className={`absolute text-4xl right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 
            ${
              isFocused
                ? "text-[#fc372d] scale-125"
                : "text-[#464646] scale-100"
            }
          `}
        >
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
