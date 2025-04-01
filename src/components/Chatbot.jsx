// src/components/Chatbot.jsx
import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/8sqe2ajtc16boe6l8to0vbyoepbe2i31.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Chat widget loads automatically
};

export default Chatbot;
