import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signupUser } from "../api/authAPI";
import Button from "../components/ui/Button";

const Signup = ({ setIsFlipped }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    street: "",
    city: "",
    zipcode: "",
    about: "",
    phone: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("Sending Data:", JSON.stringify(formData, null, 2));

    try {
      const data = await signupUser(formData);
      console.log("API Response:", data);

      if (data && data.token) {
        localStorage.setItem("token", data.token);

        alert("Signup successful! Please log in.");

        setIsFlipped(false);
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full bg-[#2c2c2c] p-6 shadow-xl rounded-lg"
      initial={{ opacity: 0, rotateY: 180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full text-center ">
        <h2 className="text-4xl font-extrabold text-white mb-4">Sign Up</h2>
        {error && (
          <p className="text-red-500 font-semibold px-2 py-4 text-left">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="First Name"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Last Name"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="about"
            placeholder="About"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="mb-3 p-2 bg-[#f7f1e4] text-sm font-bold text-[#464646] placeholder-[#464646] outline-none"
            onChange={handleChange}
            required
          />

          <Button type="submit" text="Sign Up" />
        </form>
        <p
          className="mt-4 text-white cursor-pointer"
          onClick={() => setIsFlipped(false)}
        >
          <span className="text-[#f7f1e4] font-semibold">
            Already have an account ?
          </span>
          <span className="text-[#fc372d] font-extrabold"> Sign In</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
