import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import MainLayout from "./layout/MainLayout";
import Home from "./Pages/Home.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import SavedProducts from "./Pages/SavedProducts.jsx";
import PriceAlerts from "./Pages/PriceAlerts.jsx";
import SearchResults from "./Pages/SearchResults.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import BrandDetails from "./Pages/BrandDetails.jsx";
import Loader from "./components/Loader";

// PrivateRoute component to protect private pages
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Wait until the user is loaded
  return user ? children : <Navigate to="/" replace />; // Redirect if not logged in
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        {isLoading ? (
          <Loader /> // Show a loader while the app is loading
        ) : (
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} /> {/* Home page route */}
              <Route path="/search" element={<SearchResults />} />{" "}
              {/* Search results page */}
              <Route path="/product/:name" element={<ProductDetails />} />
              {/* Product details page */}
              {/* Brand details page */}
              {/* Private Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/saved-products"
                element={
                  <PrivateRoute>
                    <SavedProducts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/price-alert"
                element={
                  <PrivateRoute>
                    <PriceAlerts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <PrivateRoute>
                    <Wishlist />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />{" "}
              {/* Redirect for undefined routes */}
            </Route>
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
