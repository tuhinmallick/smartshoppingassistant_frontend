import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-300 p-4 flex justify-between items-center">
      {/* Logo / Branding */}
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold">Smart Shopping Assistant</span>
      </div>

      {/* Icons */}
      <div className="flex space-x-4 relative">
        <a href="#" className="text-yellow-500">
          🔔
        </a>
        <a href="#" className="text-green-500">
          💬
        </a>
        <a href="#" className="text-red-500">
          ❤️
        </a>

        {/* User Icon with Dropdown */}
        <div className="relative inline-block" ref={menuRef}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(!menuOpen);
            }}
            className="text-gray-600 cursor-pointer"
          >
            👤
          </a>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <ul className="py-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    🏠 Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    👤 Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/saved-products"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    💾 Saved Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/price-alert"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    🔔 Price Alerts
                  </Link>
                </li>
                {/* New Signup and Login links */}
                <li>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    📝 Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    🔑 Log In
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
