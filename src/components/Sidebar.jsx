import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-200 p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}
      style={{ marginTop: "94px" }} // Adjust this value to match your navbar height
    >
      <button
        className="bg-gray-700 text-white p-2 mb-4 rounded w-full text-center transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: isOpen ? "100%" : "100px" }}
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {isOpen && (
        <>
          <h2 className="text-xl font-bold bg-gray-700 text-white p-2">FILTER BY</h2>
          <ul className="mt-4 space-y-2">
            {["Rating", "Color", "Storage", "Memory Size", "Price Range"].map((filter, index) => (
              <li
                key={index}
                className="border-b p-2 hover:bg-gray-500 hover:text-white cursor-pointer transition"
              >
                {filter}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
