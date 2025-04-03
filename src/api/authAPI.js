const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://smartshoppingassistant-backend.onrender.com/api";

// Signup function
export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signup failed");
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

export const loginUser = async (credentials) => {
  if (!credentials.email || !credentials.password) {
    throw new Error("email and password are required");
  }

  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid request");
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
  } else {
    throw new Error("No token received");
  }

  return data;
};

// Fetch Profile Function
export const fetchProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error fetching profile:", errorData.message);
    throw new Error(errorData.message || "Failed to fetch profile");
  }

  return response.json();
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("token");
  console.log("User logged out. Token removed.");
};
