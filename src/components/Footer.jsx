import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500 text-center p-8 mt-4">
      {/* Animated Wavy SVG */}
      <div className="absolute inset-x-0 -top-10 overflow-hidden">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          animate={{ y: [0, 10, 0] }} // Vertical motion
          transition={{ duration: 3, repeat: Infinity }}
        >
          <path
            fill="#20B2AA" // Soft peach for contrast
            d="M0,224L60,208C120,192,240,160,360,138.7C480,117,600,107,720,128C840,149,960,203,1080,213.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </motion.svg>
      </div>

      {/* Animated Social Media Buttons */}
      <div className="relative flex justify-center space-x-4 mt-10">
        <motion.button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          whileHover={{ scale: 1.1 }} // Scale effect on hover
        >
          <FaFacebook className="mr-2" /> Facebook
        </motion.button>
        <motion.button
          className="flex items-center bg-sky-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-sky-600 transition"
          whileHover={{ scale: 1.1 }} // Scale effect on hover
        >
          <FaTwitter className="mr-2" /> Twitter
        </motion.button>
        <motion.button
          className="flex items-center text-white px-4 py-2 rounded-lg shadow-md transition"
          style={{
            background:
              "linear-gradient(90deg, #FF4500 20%, #FFD700 40%, #32CD32 60%, #6A5ACD 80%)", // Vibrant gradient for Google+
          }}
          whileHover={{ scale: 1.1 }} // Scale effect on hover
        >
          <FaGoogle className="mr-2" /> Google+
        </motion.button>
      </div>

      {/* Footer Text */}
      <p className="relative mt-4 text-white font-semibold">
        © {new Date().getFullYear()} Smart Shopping Assistant. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;