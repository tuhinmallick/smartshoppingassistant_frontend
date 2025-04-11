// src/components/Loader.jsx
import React from "react";
import { motion } from "framer-motion";

const Loader = ({ onFinish }) => {
  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 3 }} // stays for 2s, fades out in 1s
      onAnimationComplete={onFinish}
    >
      <img
        src="./src/assets/loader.gif"
        alt="Loading..."
        className="w-96 h-96"
      />
    </motion.div>
  );
};

export default Loader;
