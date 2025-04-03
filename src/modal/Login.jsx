import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../api/authAPI";
import Button from "../components/ui/Button";

const Login = ({ setIsFlipped }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(formData);
      console.log("API Response:", data);

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token Saved:", localStorage.getItem("token"));

        navigate("/dashboard");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      } else {
        setError("Invalid response from server.");
        console.error("Invalid Response:", data);
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full bg-[#2c2c2c] p-6 shadow-xl rounded-lg"
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full text-center ">
        <h2 className="text-4xl font-extrabold text-white mb-4">Login</h2>
        {error && (
          <p className="text-red-500 font-semibold px-2 py-4 text-left">
            {error}
          </p>
        )}
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
            Don't have an account ?
          </span>
          <span className="text-[#fc372d] font-extrabold"> Register</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
