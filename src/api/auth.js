const API_URL = "http://localhost:5001/api/auth";

// Signup function
export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    console.log("Token stored in localStorage:", data.token);
  } else {
    throw new Error("No token received");
  }

  return data;
};

// Login function
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

  if (data.token) {
    localStorage.setItem("token", data.token);
  } else {
    throw new Error("No token received");
  }

  return data;
};

// Profile function
export const fetchProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    console.error("Error fetching profile:", response.statusText);
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("token");
  console.log("User logged out. Token removed.");
};
