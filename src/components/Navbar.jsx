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
    <nav className="bg-gradient-to-r from-blue-500  p-4 flex justify-between items-center shadow-lg rounded-b-xl fixed top-0 left-0 w-full z-50">
      <div className="flex items-center space-x-4">
        {/* Link to Homepage */}
        <Link to="/" className="text-3xl font-bold text-white tracking-wide hover:text-yellow-300 transition">
          Smart Shopping Assistant
        </Link>
      </div>

      {/* Icons */}
      <div className="flex space-x-6 items-center">
        {/* Notification Icon */}
        <a href="#" className="text-white text-xl hover:text-yellow-400 transition-colors duration-300">
          <span role="img" aria-label="Notification">🔔</span>
        </a>

        {/* Wishlist Icon */}
        <a href="#" className="text-white text-xl hover:text-red-400 transition-colors duration-300">
          <span role="img" aria-label="Wishlist">❤️</span>
        </a>

        {/* Chat Icon */}
        <a href="#" className="text-white text-xl hover:text-green-400 transition-colors duration-300">
          <span role="img" aria-label="Chat">💬</span>
        </a>

        {/* User Icon with Dropdown */}
        <div className="relative inline-block" ref={menuRef}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(!menuOpen);
            }}
            className="text-white text-xl hover:text-gray-400 transition-colors duration-300">
           {/* User Profile Icon */}
              <span role="img" aria-label="Profile">👤</span>
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
