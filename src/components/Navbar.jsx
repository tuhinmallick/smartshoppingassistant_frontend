import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500  p-4 flex justify-between items-center shadow-lg rounded-b-xl fixed top-0 left-0 w-full z-50">
      <div className="flex items-center space-x-4">
        {/* Link to Homepage */}
        <Link to="/" className="text-3xl font-bold text-white tracking-wide hover:text-yellow-300 transition">
          Smart Shopping Assistant
        </Link>
      </div>
      <div className="flex space-x-6 items-center">
        {/* Notification Icon */}
        <a href="#" className="text-white text-xl hover:text-yellow-400 transition-colors duration-300">
          <span role="img" aria-label="Notification">🔔</span>
        </a>

        {/* Chat Icon */}
        <a href="#" className="text-white text-xl hover:text-green-400 transition-colors duration-300">
          <span role="img" aria-label="Chat">💬</span>
        </a>

        {/* Wishlist Icon */}
        <a href="#" className="text-white text-xl hover:text-red-400 transition-colors duration-300">
          <span role="img" aria-label="Wishlist">❤️</span>
        </a>

        {/* User Profile Icon */}
        <a href="#" className="text-white text-xl hover:text-gray-400 transition-colors duration-300">
          <span role="img" aria-label="Profile">👤</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
