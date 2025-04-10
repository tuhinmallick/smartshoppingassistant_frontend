import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const SuccessErrorMessage = ({ closeAuthModal, type, message, onClose }) => {
  const isSuccess = type === "success";
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("closeAuthModal:", closeAuthModal); // Debugging line
    if (typeof closeAuthModal === "function") {
      closeAuthModal(false); // Close the modal
    } else {
      console.error("closeAuthModal is not a function");
    }

    if (type === "success") {
      // Navigate or other logic for success
      navigate("/"); // Redirect to the homepage
    } else {
      onClose(); // Close the error message
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 p-6 rounded-2xl shadow-xl z-50 w-[300px] ${
        isSuccess ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {isSuccess ? (
          <CheckCircle className="text-green-600 w-10 h-10 mb-2" />
        ) : (
          <XCircle className="text-red-600 w-10 h-10 mb-2" />
        )}
        <h3 className="text-xl font-bold mb-1">
          {isSuccess ? "Done!" : "Oh no!"}
        </h3>
        <p className="text-sm mb-4">{message}</p>
        <button
          onClick={handleClick}
          className={`w-full py-2 font-semibold rounded ${
            isSuccess
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {isSuccess ? "Back to Homepage" : "Try Again"}
        </button>
      </div>
    </motion.div>
  );
};

export default SuccessErrorMessage;
