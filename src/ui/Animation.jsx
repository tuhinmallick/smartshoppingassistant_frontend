import { useState } from "react";
import { motion } from "framer-motion";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Animation = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-96 h-96 mx-auto mt-20 perspective">
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Login setIsFlipped={setIsFlipped} />
        </div>
        <div
          className="absolute w-full h-full backface-hidden"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <Signup setIsFlipped={setIsFlipped} />
        </div>
      </motion.div>
    </div>
  );
};

export default Animation;
