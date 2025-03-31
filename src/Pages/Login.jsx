import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!credentials.email || !credentials.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const data = await loginUser(credentials);
      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card w-96 bg-base-200 shadow-2xl border-2 border-pink-500 p-6 rounded-xl">
      <h2 className="text-3xl font-bold text-center text-black mb-4">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full bg-transparent text-purple-500 placeholder-pink-300"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full bg-transparent text-purple-500 placeholder-pink-300"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full bg-transparent text-purple-500 placeholder-pink-300"
          onChange={handleChange}
          required
        />
        <button className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Login
        </button>
      </form>
      <p className="text-center text-black mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-pink-300 underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
