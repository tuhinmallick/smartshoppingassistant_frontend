import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signupUser } from "../api/auth";
import Button from "../ui/Button";

const Signup = ({ setIsFlipped }) => {
  const [formData, setFormData] = useState({
    name: "",
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
      await signupUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="absolute flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-xl"
      initial={{ opacity: 0, rotateY: 180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/20 p-6 rounded-2xl w-80 text-center shadow-lg backdrop-blur-md">
        <h2 className="text-xl font-bold text-white mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            className="mb-3 p-2 rounded-md bg-white/30 text-white placeholder-white outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="mb-3 p-2 rounded-md bg-white/30 text-white placeholder-white outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="mb-3 p-2 rounded-md bg-white/30 text-white placeholder-white outline-none"
            onChange={handleChange}
            required
          />
          <Button type="submit" text="Sign Up" />
        </form>
        <p
          className="mt-4 text-white cursor-pointer"
          onClick={() => setIsFlipped(false)}
        >
          Already have an account? Login
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
