import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserAuthentication from "../auth/UserAuthentication";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger icons

const Navbar = () => {
  const { user, logout, login } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!user && isHomePage) {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setAuthModalOpen(true);
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [user, isHomePage]);

  const handleLoginSuccess = (userData) => {
    if (typeof userData.token === "string") {
      setAuthModalOpen(false);
      setMenuOpen(false);
      setMobileNavOpen(false);
      navigate("/");
      login(userData.token);
    } else {
      console.error("Invalid token received");
    }
  };

  return (
    <>
      <nav className="bg-[#f7f1e4] p-4 flex justify-between items-center w-full z-50 relative shadow-md">
        <Link to="/" className="flex items-center">
          <img
            src="./src/assets/logo.png"
            alt="Smart Shopping"
            className="h-16 md:h-20 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-[#2c2c2c] text-2xl">
          <Link
            to="/notifications"
            className="hover:text-yellow-400 transition"
          >
            🔔
          </Link>
          <Link to="/wishlist" className="hover:text-red-400 transition">
            ❤️
          </Link>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hover:text-gray-400 transition"
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
                  className="absolute right-0 w-52 text-md text-[#464646] font-bold uppercase shadow-black shadow-lg"
                >
                  <ul className="bg-[#f7f1e4]">
                    {!user ? (
                      <li>
                        <button
                          onClick={() => {
                            setAuthModalOpen(true);
                            setMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 uppercase hover:bg-[#fc372d] hover:text-white"
                        >
                          🔑 Log In
                        </button>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-2 hover:bg-[#fc372d] hover:text-white"
                          >
                            🏠 Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile"
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-2 hover:bg-[#fc372d] hover:text-white"
                          >
                            👤 Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/saved-products"
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-2 hover:bg-[#fc372d] hover:text-white"
                          >
                            💾 Saved
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/price-alert"
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-2 hover:bg-[#fc372d] hover:text-white"
                          >
                            🔔 Alerts
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              logout();
                              setMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 uppercase hover:bg-[#fc372d] hover:text-white"
                          >
                            🚪 Log Out
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden text-3xl">
          <button
            onClick={() => setMobileNavOpen(!isMobileNavOpen)}
            className="text-[#2c2c2c] focus:outline-none"
          >
            {isMobileNavOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#f7f1e4] shadow-md text-xl text-[#2c2c2c] px-4 py-4 space-y-4"
          >
            <Link
              to="/notifications"
              className="block"
              onClick={() => setMobileNavOpen(false)}
            >
              🔔 Notifications
            </Link>
            <Link
              to="/wishlist"
              className="block"
              onClick={() => setMobileNavOpen(false)}
            >
              ❤️ Wishlist
            </Link>
            {!user ? (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileNavOpen(false);
                }}
                className="w-full text-left"
              >
                🔑 Log In
              </button>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block"
                  onClick={() => setMobileNavOpen(false)}
                >
                  🏠 Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block"
                  onClick={() => setMobileNavOpen(false)}
                >
                  👤 Profile
                </Link>
                <Link
                  to="/saved-products"
                  className="block"
                  onClick={() => setMobileNavOpen(false)}
                >
                  💾 Saved
                </Link>
                <Link
                  to="/price-alert"
                  className="block"
                  onClick={() => setMobileNavOpen(false)}
                >
                  🔔 Alerts
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileNavOpen(false);
                  }}
                  className="w-full text-left"
                >
                  🚪 Log Out
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-[#2c2c2c] bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
            <button
              className="absolute top-2 right-2 bg-[#fc372d] text-white py-1 px-2 text-sm rounded-xl font-bold"
              onClick={() => setAuthModalOpen(false)}
            >
              X
            </button>
            <UserAuthentication
              setAuthModalOpen={setAuthModalOpen}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
