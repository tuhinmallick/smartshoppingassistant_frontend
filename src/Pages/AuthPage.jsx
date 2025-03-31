import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../api/auth"; // Adjust paths if needed

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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
      if (isLogin) {
        const data = await loginUser(formData);
        // Handle login (store token, etc.)
        navigate("/dashboard");
      } else {
        await signupUser(formData);
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${isLogin ? "" : "flipped"}`}>
        {/* Signup Form */}
        <div className="form-container signup">
          <h2>Sign Up</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <p onClick={() => setIsLogin(true)}>Login here</p>
        </div>

        {/* Login Form */}
        <div className="form-container login">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Username or Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p onClick={() => setIsLogin(false)}>Signup here</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
