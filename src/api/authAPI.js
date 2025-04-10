const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

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

// Login function
export const loginUser = async (credentials) => {
  if (!credentials.email || !credentials.password) {
    throw new Error("email and password are required");
  }

  const response = await fetch(`${API_URL}/auth/login`, {
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

  const response = await fetch(`${API_URL}/users/profile`, {
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

// ✅ FIXED: Fetch all products
export const fetchAllProducts = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

// ✅ FIXED: Fetch product data by name
export const fetchLiveProductData = async (name) => {
  const token = localStorage.getItem("token");

  if (!name || name === "undefined") {
    console.warn("fetchLiveProductData called with invalid name");
    return null;
  }

  const url = new URL(`${API_URL}/liveData`);
  url.searchParams.append("name", name);

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch live product data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching live product data:", error);
    throw error;
  }
};
