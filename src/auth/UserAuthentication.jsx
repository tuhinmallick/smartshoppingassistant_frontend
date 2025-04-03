import { useState } from "react";
import { motion } from "framer-motion";
import Login from "../modal/Login";
import Signup from "../modal/Signup";

const UserAuthentication = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-96 h-[90vh] mx-auto flex items-center justify-center">
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%" }}
      >
        {/* Login Form */}
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Login setIsFlipped={setIsFlipped} />
        </div>

        {/* Signup Form */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="h-full max-h-[80vh] overflow-y-auto p-4 bg-[#2c2c2c] rounded-lg shadow-lg">
            <Signup setIsFlipped={setIsFlipped} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserAuthentication;
