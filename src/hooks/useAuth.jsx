import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { decodeJwt } from "../api/auth"; // Ensure this function properly decodes JWTs

export const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found in localStorage.");
      setLoading(false);
      return;
    }

    try {
      const decodedToken = decodeJwt(token); // Ensure decodeJwt is correctly implemented

      if (decodedToken) {
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          console.warn("Token expired. Logging out.");
          localStorage.removeItem("token");
          logout();
          setError("Session expired. Please log in again.");
        } else {
          login(decodedToken); // Store user data from token
        }
      } else {
        console.error("Invalid token format. Clearing storage.");
        localStorage.removeItem("token");
        logout();
        setError("Invalid token. Please log in again.");
      }
    } catch (err) {
      console.error("Error decoding token:", err);
      setError("Invalid token. Please log in again.");
      localStorage.removeItem("token");
      logout();
    }

    setLoading(false);
  }, [login, logout]);

  return { user, loading, error };
};
