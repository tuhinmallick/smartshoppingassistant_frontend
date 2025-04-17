import React from "react";
import { motion } from "framer-motion";
import loaderGif from "../assets/loader.gif"; // adjust path based on your file structure

const Loader = ({ onFinish }) => {
  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration:120, delay: 120 }} // Increased delay for a better load time
      onAnimationComplete={onFinish} // Will be called when the animation ends
    >
      <img src={loaderGif} alt="Loading..." className="w-96 h-96" />
    </motion.div>
  );
};

export default Loader;
