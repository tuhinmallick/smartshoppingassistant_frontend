import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserAuthentication from "../auth/UserAuthentication";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    document.body.style.overflow = isAuthModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAuthModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuVariants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.2,
        when: "afterChildren",
      },
    },
  };

  const menuItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <nav
        className={`bg-[#f7f1e4] p-4 flex justify-between items-center left-0 w-full z-50 relative`}
      >
        <div className="flex justify-between items-center w-full">
          <Link
            to="/"
            className="flex items-center text-3xl font-bold text-[#ffff] tracking-wide hover:text-yellow-300 transition"
          >
            <img
              src="./src/assets/logo.png"
              alt="Smart Shopping "
              className="w-auto h-24"
            />
          </Link>

          <div className="flex text-[#2c2c2c] space-x-6 items-center">
            <Link
              to="/notifications"
              className="text-4xl hover:text-yellow-400 transition-colors duration-300"
            >
              🔔
            </Link>

            <Link
              to="/wishlist"
              className="text-4xl hover:text-red-400 transition-colors duration-300"
            >
              ❤️
            </Link>

            <button
              onClick={() => console.log("Open chatbot")}
              className="text-4xl hover:text-green-400 transition-colors duration-300"
            >
              💬
            </button>

            <div className="relative inline-block" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-4xl hover:text-gray-400 transition-colors duration-300"
              >
                👤
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 w-52 text-md text-[#464646] font-bold uppercase shadow-black shadow-lg overflow-hidden"
                  >
                    <motion.ul
                      variants={menuVariants}
                      initial="closed"
                      animate={menuOpen ? "open" : "closed"}
                    >
                      {!user ? (
                        <motion.li variants={menuItemVariants}>
                          <button
                            onClick={() => {
                              setAuthModalOpen(true);
                              setMenuOpen(false);
                            }}
                            className="block px-4 py-2 w-full text-left uppercase font-bold hover:text-[#ffff] shadow-black shadow-lg hover:bg-[#fc372d] bg-[#f7f1e4] transition-all duration-300"
                          >
                            🔑 Log In
                          </button>
                        </motion.li>
                      ) : (
                        <>
                          <motion.li variants={menuItemVariants}>
                            <Link
                              to="/dashboard"
                              onClick={() => setMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-[#fc372d]  hover:text-[#ffff] shadow-black shadow-lg bg-[#f7f1e4] transition-all duration-300"
                            >
                              🏠 Dashboard
                            </Link>
                          </motion.li>
                          <motion.li variants={menuItemVariants}>
                            <Link
                              to="/profile"
                              onClick={() => setMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-[#fc372d]  hover:text-[#ffff] shadow-black shadow-lg bg-[#f7f1e4] transition-all duration-300"
                            >
                              👤 Profile
                            </Link>
                          </motion.li>
                          <motion.li variants={menuItemVariants}>
                            <Link
                              to="/saved-products"
                              onClick={() => setMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-[#fc372d]  hover:text-[#ffff] shadow-black shadow-lg bg-[#f7f1e4] transition-all duration-300"
                            >
                              💾 Saved Products
                            </Link>
                          </motion.li>
                          <motion.li variants={menuItemVariants}>
                            <Link
                              to="/price-alert"
                              onClick={() => setMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-[#fc372d]  hover:text-[#ffff] shadow-black shadow-lg bg-[#f7f1e4] transition-all duration-300"
                            >
                              🔔 Price Alerts
                            </Link>
                          </motion.li>
                          <motion.li variants={menuItemVariants}>
                            <button
                              onClick={() => {
                                logout();
                                setMenuOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 uppercase hover:text-[#ffff] hover:bg-[#fc372d] shadow-black shadow-lg bg-[#f7f1e4] transition-all duration-300"
                            >
                              🚪 Log Out
                            </button>
                          </motion.li>
                        </>
                      )}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="p-6 rounded-lg shadow-lg">
            <button
              className="bg-[#fc372d] text-[#ffff] py-1 px-2 text-sm rounded-xl font-bold"
              onClick={() => setAuthModalOpen(false)}
            >
              X
            </button>
            <UserAuthentication />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
