import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../api/authAPI";
import Button from "../components/ui/Button";
import SuccessErrorMessage from "../components/ui/SuccessErrorMessage";

const Login = ({ setIsFlipped, setAuthModalOpen, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showMessage, setShowMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMessage(null);

    try {
      const data = await loginUser(formData);
      if (data?.token) {
        localStorage.setItem("token", data.token); // Store the token in localStorage

        // Call the onLoginSuccess function passed down as a prop
        setShowMessage({
          type: "success",
          message: "Login successful! Redirecting...",
        });

        setTimeout(() => {
          onLoginSuccess(data); // Pass the user data along, ensure it's the right structure
        }, 1500);
      } else {
        throw new Error("No token returned from server.");
      }
    } catch (err) {
      setShowMessage({ type: "error", message: err.message });
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full bg-[#2c2c2c] p-6 shadow-xl rounded-lg"
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showMessage && (
        <SuccessErrorMessage
          closeAuthModal={setAuthModalOpen} // Ensure this is passed correctly
          type={showMessage.type}
          message={showMessage.message}
          onClose={() => setShowMessage(null)}
        />
      )}

      <div className="w-full text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <Button type="submit" text="Sign In" />
        </form>
        <p className="mt-4 cursor-pointer" onClick={() => setIsFlipped(true)}>
          <span className="text-[#f7f1e4] font-semibold">
            Don't have an account?
          </span>
          <span className="text-[#fc372d] font-extrabold"> Register</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
