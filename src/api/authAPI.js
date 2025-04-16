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

export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update profile");
  }

  return response.json();
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("token");
  console.log("User logged out. Token removed.");
};

// ✅ Fetch all products
export const fetchAllProducts = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage. Skipping fetchAllProducts.");
    return []; // ✅ optionally return an empty array instead of throwing
    // throw new Error("Unauthorized: No token found");
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
      const errorText = await response.text();
      console.error(
        "Failed to fetch products. Status:",
        response.status,
        "Response:",
        errorText
      );
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    console.log("Fetched products:", data); // ✅ helpful debug log
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    throw error;
  }
};

export const fetchLiveProductData = async (param) => {
  const token = localStorage.getItem("token");

  if (!param || param === "undefined") {
    console.warn("fetchLiveProductData called with invalid param");
    return null;
  }

  const url = new URL(`${API_URL}/liveData`);

  console.log("Fetching live product data with param:", param); // Log param value
  console.log("Generated URL:", url.toString()); // Log the generated URL

  if (param.length === 36) {
    url.searchParams.append("id", param);
  } else {
    url.searchParams.append("name", param);
  }

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
      throw new Error(
        `Failed to fetch live product data, status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Fetched data:", data); // Log the data for debugging
    return data;
  } catch (error) {
    console.error("Error fetching live product data:", error);
    throw error;
  }
};

export const fetchBestPriceProducts = async () => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}/products/best-prices`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch best price products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching best price products:", error);
    throw error;
  }
};

export const fetchBestStorePrices = async (data) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}/products/best-store-prices`, {
      method: "POST", // ✅ use POST for this route
      headers,
      body: JSON.stringify(data),
    });

    console.log("Request body sent to /best-store-prices:", data);

    if (!response.ok) {
      throw new Error("Failed to fetch best store prices");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching store prices:", error);
    throw error;
  }
};

// ✅ Fetch Price Alerts
export const fetchPriceAlerts = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  const response = await fetch(`${API_URL}/price-alerts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch price alerts");
  }

  return await response.json();
};

// ✅ Create Price Alert
export const createPriceAlert = async ({
  productId,
  threshold,
  storage_gb,
  color,
  ram_gb,
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  const payload = { productId, threshold, storage_gb };
  if (color) payload.color = color;
  if (ram_gb) payload.ram_gb = ram_gb;

  const response = await fetch(`${API_URL}/price-alerts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();

    // Check if the error message indicates that the alert already exists
    if (errorData.message && errorData.message === "Alert already exists") {
      throw new Error("Message: Alert already exists.");
    } else {
      throw new Error(errorData.message || "Failed to create price alert");
    }
  }

  return await response.json();
};

// ✅ Delete Price Alert
export const deletePriceAlert = async (alertId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  const response = await fetch(`${API_URL}/price-alerts/${alertId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete price alert");
  }

  return await response.json();
};

// ✅ Mark Notification as Read
export const markNotificationAsRead = async (notificationId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  const response = await fetch(
    `${API_URL}/notification/${notificationId}/read`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to mark notification as read");
  }

  return await response.json();
};

export const refreshProductPrice = async ({
  productId,
  Product_link,
  token,
}) => {
  if (!token) throw new Error("Unauthorized: No token found");

  const response = await fetch(`${API_URL}/products/update-price`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // ✅ Match casing exactly
    body: JSON.stringify({ productId, Product_link }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to refresh product price");
  }

  return await response.json();
};

export const fetchPriceHistoryChart = async (productId, options = {}) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No auth token found");

    const { storage, color, ram, timeframe } = options;

    if (!storage) throw new Error("Missing required 'storage' value");

    const queryParams = new URLSearchParams({
      ...(storage && { storage }),
      ...(color && { color }),
      ...(ram && { ram }),
      ...(timeframe && { timeframe }),
    });

    const res = await fetch(
      `${API_URL}/price-history/chart/${productId}?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`${API_URL}/price-history/chart/${productId}?${queryParams}`);

    if (!res.ok) {
      const body = await res.text();
      throw { status: res.status, body, url: res.url };
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch chart data:", error);
    throw new Error("Price history fetch failed.");
  }
};
