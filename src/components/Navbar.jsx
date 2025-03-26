import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-300 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold">Smart Shopping Assistant</span>
      </div>
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

        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 text-xl"
            >
              👤
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profile & Settings
                </Link>
                <Link
                  to="/saved-products"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Saved Products
                </Link>
                <Link
                  to="/price-alerts"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Price Alerts
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-gray-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
