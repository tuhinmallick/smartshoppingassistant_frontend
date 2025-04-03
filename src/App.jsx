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
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import SavedProducts from "./pages/SavedProducts";
import PriceAlerts from "./pages/PriceAlerts";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Chatbot from "./components/Chatbot";

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
            <Route path="/search" element={<SearchResults />} />{" "}
            {/* Search Results */}
            <Route path="/product/:id" element={<ProductDetails />} />{" "}
            {/* Product Details */}
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
