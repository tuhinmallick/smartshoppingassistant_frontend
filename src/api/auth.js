const API_URL = "http://localhost:5001/api/auth";

export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  console.log("Token stored:", data.token);
  return data;
};

export const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  console.log("Token retrieved:", token);
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Error fetching profile:", error);
    throw new Error(error?.message || "Failed to fetch profile");
  }

  return response.json();
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  console.log("User logged out and token removed.");
};
