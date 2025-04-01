import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    <nav className="bg-gradient-to-r from-blue-500 p-4 flex justify-between items-center shadow-lg rounded-b-xl fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center w-full">
        {/* Homepage Link */}
        <Link
          to="/"
          className="text-3xl font-bold text-white tracking-wide hover:text-yellow-300 transition"
        >
          Smart Shopping Assistant
        </Link>

        {/* Icons */}
        <div className="flex space-x-6 items-center">
          {/* Notification Icon */}
          <Link
            to="/notifications"
            className="text-white text-xl hover:text-yellow-400 transition-colors duration-300"
          >
            🔔
          </Link>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="text-white text-xl hover:text-red-400 transition-colors duration-300"
          >
            ❤️
          </Link>

          {/* Chat Icon */}
          <Link
            to="/chat"
            className="text-white text-xl hover:text-green-400 transition-colors duration-300"
          >
            💬
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative inline-block" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-xl hover:text-gray-400 transition-colors duration-300"
            >
              👤
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-2">
                  {!user ? (
                    <li>
                      <Link
                        to="/userauthentication"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        🔑 Log In
                      </Link>
                    </li>
                  ) : (
                    <>
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
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            setMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          🚪 Log Out
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
