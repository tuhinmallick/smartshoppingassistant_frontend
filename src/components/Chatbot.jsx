import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const scriptId = "tidio-chatbot-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "//code.tidio.co/8sqe2ajtc16boe6l8to0vbyoepbe2i31.js";
      script.async = true;
      script.onload = () => {
        if (window.tidioChatApi) {
          window.tidioChatApi.hide();
        }
      };
      document.body.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default Chatbot;
