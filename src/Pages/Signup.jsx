import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";

const Signup = () => {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-pink-600">
      <div className="card w-96 bg-base-200 shadow-2xl border-2 border-pink-500 p-6 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full bg-transparent text-white placeholder-pink-300"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full bg-transparent text-white placeholder-pink-300"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full bg-transparent text-white placeholder-pink-300"
            onChange={handleChange}
            required
          />
          <button className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Sign Up
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-pink-300 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
