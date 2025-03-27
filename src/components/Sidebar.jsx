import { useState } from "react";
import { HiOutlineFilter, HiOutlineAdjustments } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } fixed top-[74px] left-0 h-[calc(100vh - 74px)] shadow-lg`}
    >
      {/* Toggle Button */}
      <button
        className={`bg-gray-700 text-white p-2 mb-4 rounded flex items-center justify-center transition-all duration-300 ${
          isOpen ? "w-full" : "w-[60px]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <>
            <HiOutlineAdjustments className="mr-2" />
            Hide Filters
          </>
        ) : (
          <HiOutlineFilter />
        )}
      </button>

      {/* Sidebar Content */}
      {isOpen && (
        <>
          <h2 className="text-lg font-bold bg-gray-700 text-white p-2 rounded">
            FILTER BY
          </h2>
          <ul className="mt-4 space-y-2">
            {["Rating", "Color", "Storage", "Memory Size", "Price Range"].map((filter, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 p-2 hover:bg-gray-600 hover:text-yellow-400 cursor-pointer rounded transition"
              >
                <HiOutlineFilter />
                <span>{filter}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;