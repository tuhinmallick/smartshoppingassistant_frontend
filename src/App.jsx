import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import the AuthProvider and useAuth hook
import UserAuthentication from "./auth/UserAuthentication";
import MainLayout from "./layout/MainLayout";
import Home from "./Pages/Home.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import SavedProducts from "./Pages/SavedProducts.jsx";
import PriceAlerts from "./Pages/PriceAlerts.jsx";
import SearchResults from "./Pages/SearchResults.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import Chatbot from "./components/Chatbot";
import BrandDetails from "./Pages/BrandDetails.jsx"; // Ensure this path is correct

// PrivateRoute to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Return nothing while loading to avoid navigation issues

  // If user is authenticated, render the child component, otherwise redirect to login
  return user ? children : <Navigate to="/userauthentication" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main layout that wraps around the content */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} /> {/* Home page */}
            <Route
              path="/userauthentication"
              element={<UserAuthentication />} // User Authentication page
            />
            <Route
              path="/login"
              element={<Navigate to="/userauthentication" replace />} // Redirect to auth page
            />
            <Route
              path="/signup"
              element={<Navigate to="/userauthentication" replace />} // Redirect to auth page
            />
            <Route path="/search" element={<SearchResults />} /> {/* Search Results */}
            <Route path="/product/:id" element={<ProductDetails />} /> {/* Product Details */}
            <Route path="/brand/:brand" element={<BrandDetails />} /> {/* Brand Details */}
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
            {/* Catch-all route for Chatbot */}
            <Route path="*" element={<Chatbot />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;